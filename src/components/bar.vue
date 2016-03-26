<style>
  .status{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  #inputmsg{
    border-radius: 0px; 
  }

  .msg {
    min-height: 50px;
    margin-bottom: 5px;
  }

  .content{
    min-width: 100px;
    text-align: left;


  }

  div#chat-box:not(:last-child) {
    min-height: 150px;
    border-radius: 0px;
    border: 1px solid #CCCCCC;
    border-bottom: 0px;
    margin-bottom: 0px;
    padding: 20px 20px 20px 20px;
  }

  .red {
    color: #f00;
  }

  .input{
    margin-bottom: 10px;
  }
</style>

<template>

  <h4 class="ani">Chatting</h4>

  <div class="row">
    <div class="col-lg-10">
      <div id="chat-box">
        <div class="msg row" v-for="message in messages">
          <div class="col-lg-6" v-if="message.person1">
              {{ message.username }} :
              <div class="btn btn-danger content" > {{ message.content }} </div>
          </div>
          <div class="col-lg-6 pull-right" v-else>
            {{ message.username }} :
            <div class="btn btn-success content"> {{ message.content }} </div>
          </div>
        </div>
      </div>
      <input type="text" id="inputmsg" class="form-control" required="required" v-model="iMessage" v-el:msg>
    </div>
  </div>
  <p v-el:status class="status"></p>
  <br>

  <div class="row">
    <div class="col-lg-10">
      <button class="btn btn-success" v-on:click="sendMsg()">
        <span class="glyphicon glyphicon-pencil"></span>Send
      </button>
    </div>
  </div>

</template>
{{ messages | json }}
<script>

    var socket = io('http://localhost:8000');

  module.exports = {

    ready : function(){

      this.$parent.title ='Bar';

      var that = this;

        that.$watch('iMessage',function(newVal,oldVal){

          if(newVal==''){
            socket.emit('endtyping');
          }
          else{
            socket.emit('typing');
          }

        });

        socket.on('news', function (data) {
          
          that.messages.push(data);
        
        });

        socket.on('usertyping', function (data) {
          
          that.$els.status.innerHTML="The user is typing now ...";
        
        }); 

        socket.on('userendtyping', function (data) {
          
          that.$els.status.innerHTML="";
        
        });
    },
    
    data: function () {
      
      return { 
      
        messages : [],

        id : 0,
      
        status : ''
      }
    },
    methods : {

      sendMsg : function (){

        var that=this;

        var random=Math.floor((Math.random() * 2) + 1);

        if (random == 1) {
            var name="Mg Mg"; 
            var person1=true;
          }
        else {
            var name="Nyan Win";
            var person1=false;
        }
        socket.emit('send-msg', { content: that.iMessage , username : name , person1 : person1});

        console.log(that.$els.msg);

        that.$els.msg.focus();

        that.iMessage='';

      }
    },
    route: {
      
      activate: function () {
     
      }
    }     
  }
</script>