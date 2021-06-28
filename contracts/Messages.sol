pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
contract Messages {
  uint public messageCount = 0;
    
    struct Message {
    string sentFrom;
    string sentTo;
    string content;
    uint id;
}
    Message[] public messagesArray;
    //messagesArray[] public chatArray;

  mapping(uint => Message) public messages;

  function createMessage(string memory _content, string memory _sentFrom,string memory _sentTo) public {
    
    messagesArray.push(Message(_sentFrom,_sentTo, _content, messageCount));
    messageCount ++;
  }
  function getMessages()public view returns( string[] memory, string[] memory, string[] memory,uint[] memory){
      string[]    memory sentFrom = new string[](messageCount);
      string[]  memory sentTo = new string[](messageCount);
      string[]    memory content = new string[](messageCount);
      uint[]    memory id = new uint[](messageCount);
      for (uint i = 0; i < messageCount; i++) {
          Message storage thisChat = messagesArray[i];
          sentFrom[i] = thisChat.sentFrom;
          sentTo[i] = thisChat.sentTo;
          content[i] = thisChat.content;
          id[i] = thisChat.id;
      }

      return (sentFrom,sentTo, content,id);
   
}

}