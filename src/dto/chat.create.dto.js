class ChatCreateDto {
  participants;
  messages;
  constructor(chat) {
    const [senderUserId, targetUserId] = chat.participants;
    this.participants = chat.participants;
    this.messages = [{ senderUserId, text: chat.text }];
  }
}

module.exports = ChatCreateDto;
