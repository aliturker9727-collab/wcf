import * as net from 'node:net'
import * as crypto from 'node:crypto'
import { TypedEmitter } from 'tiny-typed-emitter'
import { Common } from '@/sobee/content/common'
import * as Base from '@/sobee/content/network/exports'
import { Binary, Environment, Messages, Messaging, Temporary } from '@/sobee/exports'

export namespace Socket {
  export const Log = Base.Log.getSubLogger({ name: 'Socket' })

  export namespace Component {
    export class Manager<T extends Base> {
      private Components: Set<T>

      constructor() {
        this.Components = new Set()
      }

      public Get<C extends T>(Instance: new (...args: any[]) => C): C | undefined {
        for (const Component of this.Components) {
          if (Component instanceof Instance) {
            return Component
          }
        }

        return undefined
      }

      /**
       * Important: Manager cannot have multiple same component.
       * If you try, the function returns false for this.
       */
      public Add<C extends T>(Component: C): boolean {
        if (!this.Get(Object.getPrototypeOf(Component).constructor)) {
          this.Components.add(Component)
          return !this.Components.has(Component)
        }

        return false
      }

      public Remove<C extends T>(Instance: new (...args: any[]) => C): boolean {
        const Component = this.Get(Instance)

        if (Component) {
          this.Components.delete(Component)
          return !this.Components.has(Component)
        }

        return false
      }

      public Update(Delta: number): void {
        for (const Component of this.Components) Component.Update(Delta)
      }

      public Flush(): void {
        this.Components.clear()
      }
    }

    export class Base {
      constructor() { }

      public Update(Delta: number): void {
        throw new Error('Update not implemented')
      }
    }
  }

  export class Hub {
    public readonly Rooms: Socket.Room.Manager
    private Server: net.Server
    private Messages: typeof Messaging.Event.Base[]

    constructor(Port: number, Messages: typeof this.Messages) {
      this.Rooms = new Socket.Room.Manager()
      this.Server = net.createServer(this.Connection.bind(this))
      this.Messages = Messages

      this.Server.listen(Port || 0, () => {
        Log.info('Socket listening on', Port)
      })

      this.Tick(performance.now())
    }

    private Connection(Socket: net.Socket) {
      Log.silly(`Client ${Socket.remoteAddress}:${Socket.remotePort} connected.`)

      Socket.once('data', (Data) => {
        if (!(Data instanceof Buffer)) {
          return Socket.destroy()
        }

        try {
          const Received = new Messaging.Event.Parser(Data)

          if (Received.Id === Messages.Information.Id) {
            const Information = Messages.Information.Deserialize(Received.Content)
            const Room = this.Rooms.Get(Information.Content.Session) || this.Rooms.Create(this.Messages)

            // TODO: Need additional checks for room availability
            const Client = Room.Clients.Create(Socket, Information)
            Client.Socket.emit('data', Client.Information.Initialize.Serialize())
          }
          else {
            Log.warn(`Client [${Socket.remoteAddress}:${Socket.remotePort}]:`, `Invalid initialization message`)
            Socket.destroy()
          }
        }
        catch (Error) {
          Log.error('Error when initializing socket:', Error)
          Socket.destroy()
        }
      })
    }

    private async Tick(Previous: number) {
      try {
        const Starting = performance.now()
        const Delta = (Starting - Previous) / 1000

        // Update all rooms.
        this.Rooms.Update(Delta)

        const Elapsed = performance.now() - Starting
        await new Promise(resolve => setTimeout(resolve, Math.max(0, 1000 / Environment.Fps - Elapsed)))

        setImmediate(() => this.Tick(Starting))
      }
      catch (Error) {
        Log.error('Error in Tick function:', Error)
        setImmediate(() => this.Tick(Previous))
      }
    }
  }

  export namespace Room {
    export namespace State {
      export enum Enums {
        Initialized,
        Disconnected,
      }

      export interface Arguments {
        [Enums.Initialized]: () => void
        [Enums.Disconnected]: () => void
      }
    }

    export class Manager {
      private Rooms: Map<string, Base> = new Map()
      constructor() { }

      public get List(): Base[] {
        return Array.from(this.Rooms.values())
      }

      public Get(Id: string): Base | undefined {
        return this.Rooms.get(Id)
      }

      public Create(Messages: typeof Messaging.Event.Base[]): Base {
        let Id: string

        do Id = crypto.randomUUID()
        while (this.Get(Id))

        const Room = new Base(Id, Messages)
        Room.Listen(State.Enums.Disconnected, () => this.Delete(Room.Id))

        this.Rooms.set(Id, Room)
        Log.silly(`Room ${Id} created.`)

        return Room
      }

      public Update(Delta: number) {
        this.Rooms.forEach(Room => Room.Update(Delta))
      }

      public Delete(Id: string): boolean {
        return this.Rooms.delete(Id)
      }

      public async Flush(): Promise<void> {
        for (const Room of this.List) {
          await Room.Disconnect()
          this.Delete(Room.Id)
        }
      }

      public get Count(): number {
        return this.Rooms.size
      }
    }

    export class Base {
      public readonly Id: string
      public readonly Clients: Socket.Client.Manager
      public readonly Information: Messages.Match.Information
      private Events: Messaging.Emitter.Base

      public readonly Queue: { Timestamp: number, Client: Socket.Client.Base, Received: Messaging.Event.Parser }[] = []
      public readonly Components: Component.Manager<Component.Base> = new Component.Manager()

      private readonly Notifier: TypedEmitter<{ [Key in State.Enums]: State.Arguments[Key] }> = new TypedEmitter()
      private State: State.Enums

      // TODO: Delete when your job finished
      // public readonly Bots: Socket.Bots.Manager

      constructor(Id: string, Messages: typeof Messaging.Event.Base[]) {
        this.Id = Id
        this.Clients = new Socket.Client.Manager(this)
        this.Information = Temporary.Match.Information()
        this.Events = new Messaging.Emitter.Base(Messages)

        // this.Bots = new Socket.Bots.Manager(this.Id)

        this.Setup()
      }

      private Setup() {
        // Component
        this.Components.Add(new Room.Components.Ball(this))

        // Bots
        // for (let i = 12; i < 23; i++) {
        //   this.Bots.Create(i, Socket.Bots.Components.Timeline.Events.Walk())
        // }

        // State
        this.State = State.Enums.Initialized
        this.Notifier.emit(this.State)

        Log.silly(`Room ${this.Id} initialized.`)
      }

      public Update(Delta: number) {
        this.Queue.forEach((Event, Index) => {
          const { Client, Received, Timestamp } = Event

          try {
            this.Events.emit(Received.Id, Received.Content, { Client, Room: this })
            this.Queue.splice(Index, 1)
          }
          catch (Error) {
            Log.error(`Room [${this.Id}]:`, `Error when processing ${Received.Id} event:`, Error)
          }
        })

        this.Components.Update(Delta)
        this.Clients.Update(Delta)
        // this.Bots.Update(Delta)
      }

      public Listen<T extends State.Enums>(State: T, Listener: State.Arguments[T]): void {
        this.Notifier.addListener(State, Listener)
      }

      public async Disconnect(): Promise<boolean> {
        if (this.State === State.Enums.Disconnected) {
          return false
        }

        this.State = State.Enums.Disconnected

        try {
          await Promise.all([
            this.Clients.Flush(),
            this.Components.Flush(),
            // this.Bots.Flush(),
          ])

          this.Notifier.emit(this.State)
          Log.info(`Room ${this.Id} disconnected.`)

          return true
        }
        catch (error) {
          Log.error(`Room [${this.Id}]:`, `Error when disconnecting room:`, error)
          return false
        }
      }
    }

    export namespace Components {

      export class Ball extends Component.Base {
        public Epsilon: number = 10
        public Gravity: number = (-9.81 * 100) * 2.5
        public Reduction: number = 0.985
        public Collision: boolean = true
        public Radius: number = 30
        public Speed: number = 2000
        public Boundry: Binary.Types.Vector3 = new Binary.Types.Vector3(0, 0, 11.254)

        constructor(private Room: Room.Base) {
          super()
        }

        public Update(Delta: number): void {
          const { Ball, Actor } = this.Room.Information.Content

          for (const Client of this.Room.Clients.List) {
            const { Entry } = Client.Information.Initialize.Content
            const { Direction, Position } = Client.Information.Match.Content

            if (this.Collision) {
              if (Position.Distance(Ball.Position) < this.Radius && Actor.Actioner === -1) {
                Actor.Actioner = Entry.toSquad()

                Ball.Position = new Binary.Types.Vector3(Position.X, Position.Y, this.Boundry.Z)
                Ball.Velocity = new Binary.Types.Vector3(0, 0, 0)

                this.Room.Clients.Broadcast(new Messages.Ball.Update({
                  Position: Ball.Position,
                  Velocity: Ball.Velocity,
                }))

                this.Room.Clients.Broadcast(new Messages.Ball.Get({
                  Direction,
                  Position,
                  Squad: Actor.Actioner,
                  Speed: 0,
                }))

                this.Room.Clients.Broadcast(new Messages.Chat.System.Send({
                  Text: `Actor ${Actor.Actioner} received the ball`,
                  Type: Messages.Chat.System.Type.General,
                }))
              }
            }
          }

          if (Ball.Velocity.length > this.Epsilon) {
            Ball.Velocity = new Binary.Types.Vector3(
              Ball.Velocity.X * this.Reduction,
              Ball.Velocity.Y * this.Reduction,
              (Ball.Velocity.Z + this.Gravity * Delta) * this.Reduction,
            )

            Ball.Position.Add(new Binary.Types.Vector3(
              Ball.Velocity.X * Delta,
              Ball.Velocity.Y * Delta,
              Ball.Velocity.Z * Delta,
            ))

            if (Ball.Position.Z <= this.Boundry.Z) {
              Ball.Position.Z = this.Boundry.Z
              Ball.Velocity.Z = -Ball.Velocity.Z * this.Reduction
            }

            this.Room.Clients.Broadcast(new Messages.Ball.Update({
              Position: Ball.Position,
              Velocity: Ball.Velocity,
            }))
          }
        }
      }

    }
  }

  export namespace Client {
    export namespace State {
      export enum Enums {
        Data, // dont change state for
        Initialized,
        Disconnected,
      }

      export interface Arguments {
        [Enums.Data]: (Timestamp: number, Received: Messaging.Event.Parser) => void
        [Enums.Initialized]: () => void
        [Enums.Disconnected]: () => void
      }
    }

    export class Manager {
      private Clients: Map<string, Base> = new Map()
      private Room: Room.Base

      constructor(Room: Room.Base) {
        this.Room = Room
      }

      public get List(): Base[] {
        return Array.from(this.Clients.values())
      }

      public Get(Id: string): Base | undefined {
        return this.Clients.get(Id)
      }

      public Create(Socket: net.Socket, Information: Messages.Information): Base {
        let Id: string

        do Id = crypto.randomUUID()
        while (this.Get(Id))

        const Client = new Base(Id, Socket, Information)
        Client.Listen(State.Enums.Data, (Timestamp, Received) => this.Room.Queue.push({ Timestamp, Client, Received }))
        Client.Listen(State.Enums.Disconnected, () => this.Delete(Client.Id))

        this.Clients.set(Client.Id, Client)
        Log.silly(`Room [${this.Room.Id}]: Client ${Client.Id} added.`)

        return Client
      }

      public Update(Delta: number) {
        this.Clients.forEach(Client => Client.Update(Delta))
      }

      public Broadcast(Message: Messaging.Event.Base): void {
        this.Clients.forEach(Client => Client.Broadcast(Message))
      }

      public Delete(Id: string): boolean {
        return this.Clients.delete(Id)
      }

      public async Flush(): Promise<void> {
        for (const Client of this.List) {
          await Client.Disconnect()
          this.Delete(Client.Id)
        }
      }

      public get Count(): number {
        return this.Clients.size
      }
    }

    export class Base {
      public readonly Id: string
      public readonly Socket: net.Socket
      public readonly Components: Component.Manager<Component.Base> = new Component.Manager()
      public readonly Information: {
        Initialize: Messages.Information
        Match: Messages.Player.Information
      }

      private readonly Notifier: TypedEmitter<{ [Key in State.Enums]: State.Arguments[Key] }> = new TypedEmitter()
      private State: State.Enums

      constructor(Id: string, Socket: net.Socket, Information: Messages.Information) {
        this.Id = Id
        this.Socket = Socket
        this.Information = { Initialize: Information, Match: Messages.Player.Information.Default() }

        this.Setup()
      }

      private Setup() {
        // Component
        this.Components.Add(new Client.Components.Moving(this))

        // Socket
        this.Socket.on('data', (Data) => {
          if (!(Data instanceof Buffer)) {
            Log.warn(`Client [${this.Id}]:`, `Invalid data (not a buffer)`)
            return this.Disconnect()
          }

          try {
            const Received = new Messaging.Event.Parser(Data)

            Log.silly(`Client [${this.Id}]:`, Received.Id)
            this.Notifier.emit(State.Enums.Data, performance.now(), Received)
          }
          catch (Error) {
            Log.error(`Client [${this.Id}]:`, `Error when parsing event:`, Error)
            this.Disconnect()
          }
        })

        this.Socket.on('end', () => this.Disconnect())
        this.Socket.on('close', () => this.Disconnect())
        this.Socket.on('error', () => this.Disconnect())

        // State
        this.State = State.Enums.Initialized
        this.Notifier.emit(this.State)

        // Log
        Log.silly(`Client ${this.Socket.remoteAddress}:${this.Socket.remotePort} initialized with ${this.Id} id.`)
      }

      public Update(Delta: number) {
        this.Components.Update(Delta)
      }

      public Listen<T extends State.Enums>(State: T, Listener: State.Arguments[T]): void {
        this.Notifier.addListener(State, Listener)
      }

      public Broadcast(Message: Messaging.Event.Base): boolean {
        if (this.Socket.destroyed) {
          return false;
        }
        return this.Socket.write(Message.Serialize())
      }

      public async Disconnect(): Promise<boolean> {
        if (this.State === State.Enums.Disconnected) {
          return false
        }

        return new Promise((resolve) => {
          this.Socket.destroy()

          this.Socket.once('close', () => {
            this.Components.Flush()

            this.State = State.Enums.Disconnected
            this.Notifier.emit(this.State)

            Log.silly(`Client ${this.Id} disconnected.`)
            resolve(true)
          })
        })
      }
    }

    export namespace Components {

      export class Moving extends Component.Base {
        public Speed: number = 250
        public get Sprint(): number { return this.Speed * 1.5 }
        public Stamina: number = 120
        public Reduction: number = 0.985

        constructor(private Client: Client.Base) { super() }

        public Update(Delta: number): void {
          const { Velocity, Stamina, Position } = this.Client.Information.Match.Content

          if (Velocity.length > 0) {
            Position.X += Velocity.X * Delta
            Position.Y += Velocity.Y * Delta
          }
        }
      }

    }
  }

  export namespace Bot {
    export namespace State {
      export enum Enums {
        Initialized,
        Connected,
        Disconnected,
      }

      export interface Arguments {
        [Enums.Initialized]: () => void
        [Enums.Connected]: () => void
        [Enums.Disconnected]: () => void
      }
    }

    export class Manager {
      private Bots: Map<string, Base> = new Map()
      private readonly Session: string

      constructor(Session: string) {
        this.Session = Session
      }

      public get List(): Base[] {
        return Array.from(this.Bots.values())
      }

      public Get(Id: string): Base | undefined {
        return this.Bots.get(Id)
      }

      public Create(Entry: number, Events: Bot.Events.Type): Base {
        let Id: string

        do Id = crypto.randomUUID()
        while (this.Get(Id))

        const Bot = new Base(Id, new Messages.Information({
          Version: [1, 2, 0, 3],
          Session: this.Session,
          Entry: new Common.Entry(Entry),
          Password: '',
          Software: '',
          Cpu: '',
          Gpu: '',
          Mac: '',
          Ram: 2048,
          Unknown: 0,
          Autorun: false,
        }), Events)

        Bot.Listen(State.Enums.Disconnected, () => this.Delete(Bot.Id))

        this.Bots.set(Bot.Id, Bot)
        return Bot
      }

      public Update(Delta: number): void {
        this.Bots.forEach(Bot => Bot.Update(Delta))
      }

      public Broadcast(Message: Messaging.Event.Base): void {
        this.Bots.forEach(Bot => Bot.Broadcast(Message))
      }

      public Delete(Id: string): boolean {
        return this.Bots.delete(Id)
      }

      public async Flush(): Promise<void> {
        await Promise.all(this.List.map(Bot => Bot.Disconnect()))
        this.Bots.clear()
      }

      public get Count(): number {
        return this.Bots.size
      }
    }

    export class Base {
      public readonly Id: string
      public readonly Socket: net.Socket = new net.Socket()
      public readonly Information: Messages.Information
      public readonly Components: Component.Manager<Component.Base> = new Component.Manager()

      private readonly Notifier: TypedEmitter<{ [Key in State.Enums]: State.Arguments[Key] }> = new TypedEmitter()
      private State: State.Enums

      constructor(
        Id: string,
        Information: Messages.Information,
        Events: Bot.Events.Type,
      ) {
        this.Id = Id
        this.Information = Information

        this.Setup(Events)
        this.Connect()
      }

      private Setup(Events: Bot.Events.Type): void {
        // Component
        this.Components.Add(new Bot.Components.Timeline(this, Events, true))

        // Socket
        this.Socket.on('connect', () => {
          Log.silly(`Bot [${this.Id}] [${this.Socket.localAddress}:${this.Socket.localPort}]: Connected to server (:${Environment.Port})`)
          this.Broadcast(this.Information)

          this.State = State.Enums.Connected
          this.Notifier.emit(this.State)
        })

        this.Socket.on('data', (Data) => {
          if (!(Data instanceof Buffer))
            return this.Disconnect() // TODO: Think about

          try {
            const Received = new Messaging.Event.Parser(Data)
            Log.silly(`Bot [${this.Id}]:`, Received.Id)
          }
          catch (Error) {
            Log.error(`Bot [${this.Id}]:`, `Error when parsing event:`, Error)
            this.Disconnect()
          }
        })

        this.Socket.on('end', () => this.Disconnect())
        this.Socket.on('close', () => this.Disconnect())
        this.Socket.on('error', () => this.Disconnect())

        // State
        this.State = State.Enums.Initialized
        this.Notifier.emit(this.State)
      }

      private Connect(): void {
        this.Socket.connect(Environment.Port, '127.0.0.1')
      }

      public Update(Delta: number): void {
        this.Components.Update(Delta)
      }

      public Listen<T extends State.Enums>(State: T, Listener: State.Arguments[T]): void {
        this.Notifier.addListener(State, Listener)
      }

      public Broadcast(Message: Messaging.Event.Base): boolean {
        return this.Socket.write(Message.Serialize())
      }

      public async Disconnect(): Promise<boolean> {
        if (this.State === State.Enums.Disconnected) {
          return false
        }

        return new Promise((resolve) => {
          this.Socket.destroy()

          this.Socket.once('close', () => {
            this.Components.Flush()

            this.State = State.Enums.Disconnected
            this.Notifier.emit(this.State)

            Log.silly(`Bot ${this.Id} disconnected.`)
            resolve(true)
          })
        })
      }
    }

    export namespace Components {

      export class Timeline extends Component.Base {
        private Elapsed: number = 0
        private Step: number = 0

        constructor(private Bot: Bot.Base, public Events: Bot.Events.Type, public Loop: boolean) {
          super()
        }

        public Update(Delta: number): void {
          if (this.Events.length === 0)
            return

          while (this.Step < this.Events.length && this.Events[this.Step].Timestamp <= this.Elapsed) {
            this.Events[this.Step].Function(this.Bot)
            this.Step++
          }

          if (this.Loop && this.Elapsed > this.Events[this.Events.length - 1].Timestamp) {
            this.Step = 0
            this.Elapsed = 0
          }
          else {
            this.Elapsed += Delta
          }
        }
      }

    }

    export namespace Events {
      export type Type = { Timestamp: number, Function: (Bot: Bot.Base) => void }[]

      export function Walk(): Events.Type {
        return [
          { Timestamp: 5, Function: (Bot) => { Bot.Broadcast(new Messages.GClass237({ Velocity: new Binary.Types.Vector2(-1, 0), Sprint: false })) } },
          { Timestamp: 25, Function: (Bot) => { Bot.Broadcast(new Messages.GClass237({ Velocity: new Binary.Types.Vector2(1, 0), Sprint: false })) } },
          { Timestamp: 45, Function: (Bot) => { Bot.Broadcast(new Messages.GClass260({})) } },
        ]
      }
    }
  }

}
