type User = {
  username: string,
  isAdmin: boolean,
}

type Message = {
  content: string,
  user: User,
  sentAt: Date,
};

type Channel = {
  messages: Message[],
  name: string,
  needsAdmin: boolean,
};

type ChannelWOMessages = {
  name: string,
  needsAdmin: boolean,
  uriSlug: string,
}