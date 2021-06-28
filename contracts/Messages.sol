pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
contract Messages {
  uint public messageCount = 0;
    
    struct Message {
    string sentFrom;
    string sentTo;
    string content;
    string hashToken;
    uint id;
}
    Message[] public messagesArray;
    //messagesArray[] public chatArray;

  mapping(uint => Message) public messages;

  function createMessage(string memory _sentFrom,string memory _sentTo, string memory _content,string memory _hashToken ) public {
    
    messagesArray.push(Message(_sentFrom,_sentTo, _content,_hashToken, messageCount));
    messageCount ++;
  }
   function getChatLength(string memory _hashToken)public view returns(uint){
        uint thisChatCount = 0;
      //first see how many messages are in the chat
    
        for (uint i = 0; i < messageCount; i++) {
          Message storage thisChat = messagesArray[i];
          if(keccak256(abi.encodePacked(thisChat.hashToken)) ==keccak256(abi.encodePacked( _hashToken))){
              thisChatCount ++;
          }
          
         
      }
      return thisChatCount;
   }

  function getMessages(string memory _hashToken)public view returns( string[] memory, string[] memory, string[] memory,uint[] memory){
      uint thisChatCount = 0;
      
       uint tempChatCount = 0;
      //first see how many messages are in the chat
    
        for (uint i = 0; i < messageCount; i++) {
          Message storage thisChat = messagesArray[i];
          if(keccak256(abi.encodePacked(thisChat.hashToken)) ==keccak256(abi.encodePacked( _hashToken))){
              tempChatCount ++;
          }
          
         
      }
      string[] memory sentFrom = new string[](tempChatCount);
      string[] memory sentTo = new string[](tempChatCount);
      string[] memory content = new string[](tempChatCount);
      uint[] memory id = new uint[](tempChatCount);
      
      for (uint i = 0; i < messageCount; i++) {
          Message storage thisChat = messagesArray[i];
           if(keccak256(abi.encodePacked(thisChat.hashToken)) ==keccak256(abi.encodePacked( _hashToken))){
             
            sentFrom[thisChatCount] = thisChat.sentFrom;
                sentTo[thisChatCount] = thisChat.sentTo;
                content[thisChatCount] = thisChat.content;
                id[thisChatCount] = thisChat.id;
              thisChatCount ++;
          }
           
           
          
          
         
      }

      return (sentFrom,sentTo, content, id);
   
}

}