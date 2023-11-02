type User = {
  username: string,
}

type Message = {
  content: string,
  user: User,
  sentAt: Date,
};

type Channel = {
  messages: Message[],
  name: string,
};