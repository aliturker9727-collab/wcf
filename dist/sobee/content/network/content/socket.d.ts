import * as net from 'node:net';
import { Binary, Messages, Messaging } from '../../../../sobee/exports';
export declare namespace Socket {
    const Log: import("tslog").Logger<unknown>;
    namespace Component {
        class Manager<T extends Base> {
            private Components;
            constructor();
            Get<C extends T>(Instance: new (...args: any[]) => C): C | undefined;
            /**
             * Important: Manager cannot have multiple same component.
             * If you try, the function returns false for this.
             */
            Add<C extends T>(Component: C): boolean;
            Remove<C extends T>(Instance: new (...args: any[]) => C): boolean;
            Update(Delta: number): void;
            Flush(): void;
        }
        class Base {
            constructor();
            Update(Delta: number): void;
        }
    }
    class Hub {
        readonly Rooms: Socket.Room.Manager;
        private Server;
        private Messages;
        constructor(Port: number, Messages: typeof this.Messages);
        private Connection;
        private Tick;
    }
    namespace Room {
        namespace State {
            enum Enums {
                Initialized = 0,
                Disconnected = 1
            }
            interface Arguments {
                [Enums.Initialized]: () => void;
                [Enums.Disconnected]: () => void;
            }
        }
        class Manager {
            private Rooms;
            constructor();
            get List(): Base[];
            Get(Id: string): Base | undefined;
            Create(Messages: typeof Messaging.Event.Base[]): Base;
            Update(Delta: number): void;
            Delete(Id: string): boolean;
            Flush(): Promise<void>;
            get Count(): number;
        }
        class Base {
            readonly Id: string;
            readonly Clients: Socket.Client.Manager;
            readonly Information: Messages.Match.Information;
            private Events;
            readonly Queue: {
                Timestamp: number;
                Client: Socket.Client.Base;
                Received: Messaging.Event.Parser;
            }[];
            readonly Components: Component.Manager<Component.Base>;
            private readonly Notifier;
            private State;
            constructor(Id: string, Messages: typeof Messaging.Event.Base[]);
            private Setup;
            Update(Delta: number): void;
            Listen<T extends State.Enums>(State: T, Listener: State.Arguments[T]): void;
            Disconnect(): Promise<boolean>;
        }
        namespace Components {
            class Ball extends Component.Base {
                private Room;
                Epsilon: number;
                Gravity: number;
                Reduction: number;
                Collision: boolean;
                Radius: number;
                Speed: number;
                Boundry: Binary.Types.Vector3;
                constructor(Room: Room.Base);
                Update(Delta: number): void;
            }
        }
    }
    namespace Client {
        namespace State {
            enum Enums {
                Data = 0,// dont change state for
                Initialized = 1,
                Disconnected = 2
            }
            interface Arguments {
                [Enums.Data]: (Timestamp: number, Received: Messaging.Event.Parser) => void;
                [Enums.Initialized]: () => void;
                [Enums.Disconnected]: () => void;
            }
        }
        class Manager {
            private Clients;
            private Room;
            constructor(Room: Room.Base);
            get List(): Base[];
            Get(Id: string): Base | undefined;
            Create(Socket: net.Socket, Information: Messages.Information): Base;
            Update(Delta: number): void;
            Broadcast(Message: Messaging.Event.Base): void;
            Delete(Id: string): boolean;
            Flush(): Promise<void>;
            get Count(): number;
        }
        class Base {
            readonly Id: string;
            readonly Socket: net.Socket;
            readonly Components: Component.Manager<Component.Base>;
            readonly Information: {
                Initialize: Messages.Information;
                Match: Messages.Player.Information;
            };
            private readonly Notifier;
            private State;
            constructor(Id: string, Socket: net.Socket, Information: Messages.Information);
            private Setup;
            Update(Delta: number): void;
            Listen<T extends State.Enums>(State: T, Listener: State.Arguments[T]): void;
            Broadcast(Message: Messaging.Event.Base): boolean;
            Disconnect(): Promise<boolean>;
        }
        namespace Components {
            class Moving extends Component.Base {
                private Client;
                Speed: number;
                get Sprint(): number;
                Stamina: number;
                Reduction: number;
                constructor(Client: Client.Base);
                Update(Delta: number): void;
            }
        }
    }
    namespace Bot {
        namespace State {
            enum Enums {
                Initialized = 0,
                Connected = 1,
                Disconnected = 2
            }
            interface Arguments {
                [Enums.Initialized]: () => void;
                [Enums.Connected]: () => void;
                [Enums.Disconnected]: () => void;
            }
        }
        class Manager {
            private Bots;
            private readonly Session;
            constructor(Session: string);
            get List(): Base[];
            Get(Id: string): Base | undefined;
            Create(Entry: number, Events: Bot.Events.Type): Base;
            Update(Delta: number): void;
            Broadcast(Message: Messaging.Event.Base): void;
            Delete(Id: string): boolean;
            Flush(): Promise<void>;
            get Count(): number;
        }
        class Base {
            readonly Id: string;
            readonly Socket: net.Socket;
            readonly Information: Messages.Information;
            readonly Components: Component.Manager<Component.Base>;
            private readonly Notifier;
            private State;
            constructor(Id: string, Information: Messages.Information, Events: Bot.Events.Type);
            private Setup;
            private Connect;
            Update(Delta: number): void;
            Listen<T extends State.Enums>(State: T, Listener: State.Arguments[T]): void;
            Broadcast(Message: Messaging.Event.Base): boolean;
            Disconnect(): Promise<boolean>;
        }
        namespace Components {
            class Timeline extends Component.Base {
                private Bot;
                Events: Bot.Events.Type;
                Loop: boolean;
                private Elapsed;
                private Step;
                constructor(Bot: Bot.Base, Events: Bot.Events.Type, Loop: boolean);
                Update(Delta: number): void;
            }
        }
        namespace Events {
            type Type = {
                Timestamp: number;
                Function: (Bot: Bot.Base) => void;
            }[];
            function Walk(): Events.Type;
        }
    }
}
