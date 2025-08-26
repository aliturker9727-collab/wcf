"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const net = __importStar(require("node:net"));
const crypto = __importStar(require("node:crypto"));
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const common_1 = require("../../../../sobee/content/common");
const Base = __importStar(require("../../../../sobee/content/network/exports"));
const exports_1 = require("../../../../sobee/exports");
var Socket;
(function (Socket_1) {
    Socket_1.Log = Base.Log.getSubLogger({ name: 'Socket' });
    let Component;
    (function (Component_1) {
        class Manager {
            constructor() {
                this.Components = new Set();
            }
            Get(Instance) {
                for (const Component of this.Components) {
                    if (Component instanceof Instance) {
                        return Component;
                    }
                }
                return undefined;
            }
            /**
             * Important: Manager cannot have multiple same component.
             * If you try, the function returns false for this.
             */
            Add(Component) {
                if (!this.Get(Object.getPrototypeOf(Component).constructor)) {
                    this.Components.add(Component);
                    return !this.Components.has(Component);
                }
                return false;
            }
            Remove(Instance) {
                const Component = this.Get(Instance);
                if (Component) {
                    this.Components.delete(Component);
                    return !this.Components.has(Component);
                }
                return false;
            }
            Update(Delta) {
                for (const Component of this.Components)
                    Component.Update(Delta);
            }
            Flush() {
                this.Components.clear();
            }
        }
        Component_1.Manager = Manager;
        class Base {
            constructor() { }
            Update(Delta) {
                throw new Error('Update not implemented');
            }
        }
        Component_1.Base = Base;
    })(Component = Socket_1.Component || (Socket_1.Component = {}));
    class Hub {
        constructor(Port, Messages) {
            this.Rooms = new Socket.Room.Manager();
            this.Server = net.createServer(this.Connection.bind(this));
            this.Messages = Messages;
            this.Server.listen(Port || 0, () => {
                Socket_1.Log.info('Socket listening on', Port);
            });
            this.Tick(performance.now());
        }
        Connection(Socket) {
            Socket_1.Log.silly(`Client ${Socket.remoteAddress}:${Socket.remotePort} connected.`);
            Socket.once('data', (Data) => {
                if (!(Data instanceof Buffer)) {
                    return Socket.destroy();
                }
                try {
                    const Received = new exports_1.Messaging.Event.Parser(Data);
                    if (Received.Id === exports_1.Messages.Information.Id) {
                        const Information = exports_1.Messages.Information.Deserialize(Received.Content);
                        const Room = this.Rooms.Get(Information.Content.Session) || this.Rooms.Create(this.Messages);
                        // TODO: Need additional checks for room availability
                        const Client = Room.Clients.Create(Socket, Information);
                        Client.Socket.emit('data', Client.Information.Initialize.Serialize());
                    }
                    else {
                        Socket_1.Log.warn(`Client [${Socket.remoteAddress}:${Socket.remotePort}]:`, `Invalid initialization message`);
                        Socket.destroy();
                    }
                }
                catch (Error) {
                    Socket_1.Log.error('Error when initializing socket:', Error);
                    Socket.destroy();
                }
            });
        }
        async Tick(Previous) {
            try {
                const Starting = performance.now();
                const Delta = (Starting - Previous) / 1000;
                // Update all rooms.
                this.Rooms.Update(Delta);
                const Elapsed = performance.now() - Starting;
                await new Promise(resolve => setTimeout(resolve, Math.max(0, 1000 / exports_1.Environment.Fps - Elapsed)));
                setImmediate(() => this.Tick(Starting));
            }
            catch (Error) {
                Socket_1.Log.error('Error in Tick function:', Error);
                setImmediate(() => this.Tick(Previous));
            }
        }
    }
    Socket_1.Hub = Hub;
    let Room;
    (function (Room_1) {
        let State;
        (function (State) {
            let Enums;
            (function (Enums) {
                Enums[Enums["Initialized"] = 0] = "Initialized";
                Enums[Enums["Disconnected"] = 1] = "Disconnected";
            })(Enums = State.Enums || (State.Enums = {}));
        })(State = Room_1.State || (Room_1.State = {}));
        class Manager {
            constructor() {
                this.Rooms = new Map();
            }
            get List() {
                return Array.from(this.Rooms.values());
            }
            Get(Id) {
                return this.Rooms.get(Id);
            }
            Create(Messages) {
                let Id;
                do
                    Id = crypto.randomUUID();
                while (this.Get(Id));
                const Room = new Base(Id, Messages);
                Room.Listen(State.Enums.Disconnected, () => this.Delete(Room.Id));
                this.Rooms.set(Id, Room);
                Socket_1.Log.silly(`Room ${Id} created.`);
                return Room;
            }
            Update(Delta) {
                this.Rooms.forEach(Room => Room.Update(Delta));
            }
            Delete(Id) {
                return this.Rooms.delete(Id);
            }
            async Flush() {
                for (const Room of this.List) {
                    await Room.Disconnect();
                    this.Delete(Room.Id);
                }
            }
            get Count() {
                return this.Rooms.size;
            }
        }
        Room_1.Manager = Manager;
        class Base {
            // TODO: Delete when your job finished
            // public readonly Bots: Socket.Bots.Manager
            constructor(Id, Messages) {
                this.Queue = [];
                this.Components = new Component.Manager();
                this.Notifier = new tiny_typed_emitter_1.TypedEmitter();
                this.Id = Id;
                this.Clients = new Socket.Client.Manager(this);
                this.Information = exports_1.Temporary.Match.Information();
                this.Events = new exports_1.Messaging.Emitter.Base(Messages);
                // this.Bots = new Socket.Bots.Manager(this.Id)
                this.Setup();
            }
            Setup() {
                // Component
                this.Components.Add(new Room.Components.Ball(this));
                // Bots
                // for (let i = 12; i < 23; i++) {
                //   this.Bots.Create(i, Socket.Bots.Components.Timeline.Events.Walk())
                // }
                // State
                this.State = State.Enums.Initialized;
                this.Notifier.emit(this.State);
                Socket_1.Log.silly(`Room ${this.Id} initialized.`);
            }
            Update(Delta) {
                this.Queue.forEach((Event, Index) => {
                    const { Client, Received, Timestamp } = Event;
                    try {
                        this.Events.emit(Received.Id, Received.Content, { Client, Room: this });
                        this.Queue.splice(Index, 1);
                    }
                    catch (Error) {
                        Socket_1.Log.error(`Room [${this.Id}]:`, `Error when processing ${Received.Id} event:`, Error);
                    }
                });
                this.Components.Update(Delta);
                this.Clients.Update(Delta);
                // this.Bots.Update(Delta)
            }
            Listen(State, Listener) {
                this.Notifier.addListener(State, Listener);
            }
            async Disconnect() {
                if (this.State === State.Enums.Disconnected) {
                    return false;
                }
                this.State = State.Enums.Disconnected;
                try {
                    await Promise.all([
                        this.Clients.Flush(),
                        this.Components.Flush(),
                        // this.Bots.Flush(),
                    ]);
                    this.Notifier.emit(this.State);
                    Socket_1.Log.info(`Room ${this.Id} disconnected.`);
                    return true;
                }
                catch (error) {
                    Socket_1.Log.error(`Room [${this.Id}]:`, `Error when disconnecting room:`, error);
                    return false;
                }
            }
        }
        Room_1.Base = Base;
        let Components;
        (function (Components) {
            class Ball extends Component.Base {
                constructor(Room) {
                    super();
                    this.Room = Room;
                    this.Epsilon = 10;
                    this.Gravity = (-9.81 * 100) * 2.5;
                    this.Reduction = 0.985;
                    this.Collision = true;
                    this.Radius = 30;
                    this.Speed = 2000;
                    this.Boundry = new exports_1.Binary.Types.Vector3(0, 0, 11.254);
                }
                Update(Delta) {
                    const { Ball, Actor } = this.Room.Information.Content;
                    for (const Client of this.Room.Clients.List) {
                        const { Entry } = Client.Information.Initialize.Content;
                        const { Direction, Position } = Client.Information.Match.Content;
                        if (this.Collision) {
                            if (Position.Distance(Ball.Position) < this.Radius && Actor.Actioner === -1) {
                                Actor.Actioner = Entry.toSquad();
                                Ball.Position = new exports_1.Binary.Types.Vector3(Position.X, Position.Y, this.Boundry.Z);
                                Ball.Velocity = new exports_1.Binary.Types.Vector3(0, 0, 0);
                                this.Room.Clients.Broadcast(new exports_1.Messages.Ball.Update({
                                    Position: Ball.Position,
                                    Velocity: Ball.Velocity,
                                }));
                                this.Room.Clients.Broadcast(new exports_1.Messages.Ball.Get({
                                    Direction,
                                    Position,
                                    Squad: Actor.Actioner,
                                    Speed: 0,
                                }));
                                this.Room.Clients.Broadcast(new exports_1.Messages.Chat.System.Send({
                                    Text: `Actor ${Actor.Actioner} received the ball`,
                                    Type: exports_1.Messages.Chat.System.Type.General,
                                }));
                            }
                        }
                    }
                    if (Ball.Velocity.length > this.Epsilon) {
                        Ball.Velocity = new exports_1.Binary.Types.Vector3(Ball.Velocity.X * this.Reduction, Ball.Velocity.Y * this.Reduction, (Ball.Velocity.Z + this.Gravity * Delta) * this.Reduction);
                        Ball.Position.Add(new exports_1.Binary.Types.Vector3(Ball.Velocity.X * Delta, Ball.Velocity.Y * Delta, Ball.Velocity.Z * Delta));
                        if (Ball.Position.Z <= this.Boundry.Z) {
                            Ball.Position.Z = this.Boundry.Z;
                            Ball.Velocity.Z = -Ball.Velocity.Z * this.Reduction;
                        }
                        this.Room.Clients.Broadcast(new exports_1.Messages.Ball.Update({
                            Position: Ball.Position,
                            Velocity: Ball.Velocity,
                        }));
                    }
                }
            }
            Components.Ball = Ball;
        })(Components = Room_1.Components || (Room_1.Components = {}));
    })(Room = Socket_1.Room || (Socket_1.Room = {}));
    let Client;
    (function (Client_1) {
        let State;
        (function (State) {
            let Enums;
            (function (Enums) {
                Enums[Enums["Data"] = 0] = "Data";
                Enums[Enums["Initialized"] = 1] = "Initialized";
                Enums[Enums["Disconnected"] = 2] = "Disconnected";
            })(Enums = State.Enums || (State.Enums = {}));
        })(State = Client_1.State || (Client_1.State = {}));
        class Manager {
            constructor(Room) {
                this.Clients = new Map();
                this.Room = Room;
            }
            get List() {
                return Array.from(this.Clients.values());
            }
            Get(Id) {
                return this.Clients.get(Id);
            }
            Create(Socket, Information) {
                let Id;
                do
                    Id = crypto.randomUUID();
                while (this.Get(Id));
                const Client = new Base(Id, Socket, Information);
                Client.Listen(State.Enums.Data, (Timestamp, Received) => this.Room.Queue.push({ Timestamp, Client, Received }));
                Client.Listen(State.Enums.Disconnected, () => this.Delete(Client.Id));
                this.Clients.set(Client.Id, Client);
                Socket_1.Log.silly(`Room [${this.Room.Id}]: Client ${Client.Id} added.`);
                return Client;
            }
            Update(Delta) {
                this.Clients.forEach(Client => Client.Update(Delta));
            }
            Broadcast(Message) {
                this.Clients.forEach(Client => Client.Broadcast(Message));
            }
            Delete(Id) {
                return this.Clients.delete(Id);
            }
            async Flush() {
                for (const Client of this.List) {
                    await Client.Disconnect();
                    this.Delete(Client.Id);
                }
            }
            get Count() {
                return this.Clients.size;
            }
        }
        Client_1.Manager = Manager;
        class Base {
            constructor(Id, Socket, Information) {
                this.Components = new Component.Manager();
                this.Notifier = new tiny_typed_emitter_1.TypedEmitter();
                this.Id = Id;
                this.Socket = Socket;
                this.Information = { Initialize: Information, Match: exports_1.Messages.Player.Information.Default() };
                this.Setup();
            }
            Setup() {
                // Component
                this.Components.Add(new Client.Components.Moving(this));
                // Socket
                this.Socket.on('data', (Data) => {
                    if (!(Data instanceof Buffer)) {
                        Socket_1.Log.warn(`Client [${this.Id}]:`, `Invalid data (not a buffer)`);
                        return this.Disconnect();
                    }
                    try {
                        const Received = new exports_1.Messaging.Event.Parser(Data);
                        Socket_1.Log.silly(`Client [${this.Id}]:`, Received.Id);
                        this.Notifier.emit(State.Enums.Data, performance.now(), Received);
                    }
                    catch (Error) {
                        Socket_1.Log.error(`Client [${this.Id}]:`, `Error when parsing event:`, Error);
                        this.Disconnect();
                    }
                });
                this.Socket.on('end', () => this.Disconnect());
                this.Socket.on('close', () => this.Disconnect());
                this.Socket.on('error', () => this.Disconnect());
                // State
                this.State = State.Enums.Initialized;
                this.Notifier.emit(this.State);
                // Log
                Socket_1.Log.silly(`Client ${this.Socket.remoteAddress}:${this.Socket.remotePort} initialized with ${this.Id} id.`);
            }
            Update(Delta) {
                this.Components.Update(Delta);
            }
            Listen(State, Listener) {
                this.Notifier.addListener(State, Listener);
            }
            Broadcast(Message) {
                if (this.Socket.destroyed) {
                    return false;
                }
                return this.Socket.write(Message.Serialize());
            }
            async Disconnect() {
                if (this.State === State.Enums.Disconnected) {
                    return false;
                }
                return new Promise((resolve) => {
                    this.Socket.destroy();
                    this.Socket.once('close', () => {
                        this.Components.Flush();
                        this.State = State.Enums.Disconnected;
                        this.Notifier.emit(this.State);
                        Socket_1.Log.silly(`Client ${this.Id} disconnected.`);
                        resolve(true);
                    });
                });
            }
        }
        Client_1.Base = Base;
        let Components;
        (function (Components) {
            class Moving extends Component.Base {
                get Sprint() { return this.Speed * 1.5; }
                constructor(Client) {
                    super();
                    this.Client = Client;
                    this.Speed = 250;
                    this.Stamina = 120;
                    this.Reduction = 0.985;
                }
                Update(Delta) {
                    const { Velocity, Stamina, Position } = this.Client.Information.Match.Content;
                    if (Velocity.length > 0) {
                        Position.X += Velocity.X * Delta;
                        Position.Y += Velocity.Y * Delta;
                    }
                }
            }
            Components.Moving = Moving;
        })(Components = Client_1.Components || (Client_1.Components = {}));
    })(Client = Socket_1.Client || (Socket_1.Client = {}));
    let Bot;
    (function (Bot_1) {
        let State;
        (function (State) {
            let Enums;
            (function (Enums) {
                Enums[Enums["Initialized"] = 0] = "Initialized";
                Enums[Enums["Connected"] = 1] = "Connected";
                Enums[Enums["Disconnected"] = 2] = "Disconnected";
            })(Enums = State.Enums || (State.Enums = {}));
        })(State = Bot_1.State || (Bot_1.State = {}));
        class Manager {
            constructor(Session) {
                this.Bots = new Map();
                this.Session = Session;
            }
            get List() {
                return Array.from(this.Bots.values());
            }
            Get(Id) {
                return this.Bots.get(Id);
            }
            Create(Entry, Events) {
                let Id;
                do
                    Id = crypto.randomUUID();
                while (this.Get(Id));
                const Bot = new Base(Id, new exports_1.Messages.Information({
                    Version: [1, 2, 0, 3],
                    Session: this.Session,
                    Entry: new common_1.Common.Entry(Entry),
                    Password: '',
                    Software: '',
                    Cpu: '',
                    Gpu: '',
                    Mac: '',
                    Ram: 2048,
                    Unknown: 0,
                    Autorun: false,
                }), Events);
                Bot.Listen(State.Enums.Disconnected, () => this.Delete(Bot.Id));
                this.Bots.set(Bot.Id, Bot);
                return Bot;
            }
            Update(Delta) {
                this.Bots.forEach(Bot => Bot.Update(Delta));
            }
            Broadcast(Message) {
                this.Bots.forEach(Bot => Bot.Broadcast(Message));
            }
            Delete(Id) {
                return this.Bots.delete(Id);
            }
            async Flush() {
                await Promise.all(this.List.map(Bot => Bot.Disconnect()));
                this.Bots.clear();
            }
            get Count() {
                return this.Bots.size;
            }
        }
        Bot_1.Manager = Manager;
        class Base {
            constructor(Id, Information, Events) {
                this.Socket = new net.Socket();
                this.Components = new Component.Manager();
                this.Notifier = new tiny_typed_emitter_1.TypedEmitter();
                this.Id = Id;
                this.Information = Information;
                this.Setup(Events);
                this.Connect();
            }
            Setup(Events) {
                // Component
                this.Components.Add(new Bot.Components.Timeline(this, Events, true));
                // Socket
                this.Socket.on('connect', () => {
                    Socket_1.Log.silly(`Bot [${this.Id}] [${this.Socket.localAddress}:${this.Socket.localPort}]: Connected to server (:${exports_1.Environment.Port})`);
                    this.Broadcast(this.Information);
                    this.State = State.Enums.Connected;
                    this.Notifier.emit(this.State);
                });
                this.Socket.on('data', (Data) => {
                    if (!(Data instanceof Buffer))
                        return this.Disconnect(); // TODO: Think about
                    try {
                        const Received = new exports_1.Messaging.Event.Parser(Data);
                        Socket_1.Log.silly(`Bot [${this.Id}]:`, Received.Id);
                    }
                    catch (Error) {
                        Socket_1.Log.error(`Bot [${this.Id}]:`, `Error when parsing event:`, Error);
                        this.Disconnect();
                    }
                });
                this.Socket.on('end', () => this.Disconnect());
                this.Socket.on('close', () => this.Disconnect());
                this.Socket.on('error', () => this.Disconnect());
                // State
                this.State = State.Enums.Initialized;
                this.Notifier.emit(this.State);
            }
            Connect() {
                this.Socket.connect(exports_1.Environment.Port, '127.0.0.1');
            }
            Update(Delta) {
                this.Components.Update(Delta);
            }
            Listen(State, Listener) {
                this.Notifier.addListener(State, Listener);
            }
            Broadcast(Message) {
                return this.Socket.write(Message.Serialize());
            }
            async Disconnect() {
                if (this.State === State.Enums.Disconnected) {
                    return false;
                }
                return new Promise((resolve) => {
                    this.Socket.destroy();
                    this.Socket.once('close', () => {
                        this.Components.Flush();
                        this.State = State.Enums.Disconnected;
                        this.Notifier.emit(this.State);
                        Socket_1.Log.silly(`Bot ${this.Id} disconnected.`);
                        resolve(true);
                    });
                });
            }
        }
        Bot_1.Base = Base;
        let Components;
        (function (Components) {
            class Timeline extends Component.Base {
                constructor(Bot, Events, Loop) {
                    super();
                    this.Bot = Bot;
                    this.Events = Events;
                    this.Loop = Loop;
                    this.Elapsed = 0;
                    this.Step = 0;
                }
                Update(Delta) {
                    if (this.Events.length === 0)
                        return;
                    while (this.Step < this.Events.length && this.Events[this.Step].Timestamp <= this.Elapsed) {
                        this.Events[this.Step].Function(this.Bot);
                        this.Step++;
                    }
                    if (this.Loop && this.Elapsed > this.Events[this.Events.length - 1].Timestamp) {
                        this.Step = 0;
                        this.Elapsed = 0;
                    }
                    else {
                        this.Elapsed += Delta;
                    }
                }
            }
            Components.Timeline = Timeline;
        })(Components = Bot_1.Components || (Bot_1.Components = {}));
        let Events;
        (function (Events) {
            function Walk() {
                return [
                    { Timestamp: 5, Function: (Bot) => { Bot.Broadcast(new exports_1.Messages.GClass237({ Velocity: new exports_1.Binary.Types.Vector2(-1, 0), Sprint: false })); } },
                    { Timestamp: 25, Function: (Bot) => { Bot.Broadcast(new exports_1.Messages.GClass237({ Velocity: new exports_1.Binary.Types.Vector2(1, 0), Sprint: false })); } },
                    { Timestamp: 45, Function: (Bot) => { Bot.Broadcast(new exports_1.Messages.GClass260({})); } },
                ];
            }
            Events.Walk = Walk;
        })(Events = Bot_1.Events || (Bot_1.Events = {}));
    })(Bot = Socket_1.Bot || (Socket_1.Bot = {}));
})(Socket || (exports.Socket = Socket = {}));
