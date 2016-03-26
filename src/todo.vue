<style>
  .red {
    color: #f00;
  }
  .input{
    margin-bottom: 10px;
  }
  .clickable{
    cursor: pointer;
  }
</style>

<template>

  <h1 class="red text-center">{{msg}}</h1>
  
  <div class="col-lg-6 col-lg-offset-3 text-center">
    <ul class="list-group clear-right" v-for="todo in todos">
      <li class="list-group-item pull-le">{{ todo.title }} <small>{{ todo.content }}</small>
        <a class="pull-right text-danger clickable" v-on:click="removeTask(todo)"> &#9747; </a>
      </li>
    </ul>
    <div class="row">
      <div class="col-lg-12">
        <input class="form-control" v-model="newTodoTitle" v-el="newTask">  <br>
        <textarea v-model="newTodoContent" class="form-control"> </textarea> <br>
        <button v-on:click="addTask($event)" class="btn btn-success">Add</button>
      </div>
    </div>
  </div>

</template>

<script>

  module.exports = {
    
    data: function () {
      return {
        msg: 'Hello world!',
        a : 1,
        b : 2,
        todos:null,
      }
    },
    computed: {

      ab: function () {
      
        return this.a + this.b;
      
      }
    },
    ready : function(){
      
      var that=this;

      that.$http.get('/api', function (data, status, request) {
      
        that.todos=data;
      
      }).error(function (data, status, request) {
      
          console.log('err')
      });

    },

    methods : {

      addTask: function(e){

        e.preventDefault();
    
        if(this.newTodoTitle==null||this.newTodoTitle=='') return;

        var data={ title : this.newTodoTitle, content : this.newTodoContent}
        
        this.$http.post('/api',data, function (data, status, request) {        

        }).success(function (data, status, request) {
        
          console.log(data);

        });

        this.todos.push({
          
          title: this.newTodoTitle,
          
          content: this.newTodoContent

        });
        
        this.newTodoTitle='';    
        
        this.newTodoContent='';    

      },
      removeTask: function(todo){
  
        var that=this;

        that.$http.delete('/api/'+todo.id, function (data, status, request) {        

        }).success(function (data, status, request) {
        
          that.todos.$remove(todo);

        });
      }

    }        
  }
</script>