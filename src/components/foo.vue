<style>
  
  #form{
    margin-bottom:20px;
  }

  .red {
    color: #f00;
  }
  .input{
    margin-bottom: 10px;
  }
  #table{
    border-radius: 5px;
  }
</style>

<template>

  <div class="row">
    <div class="col-lg-12">
      <div class="panel panel-default">
          <table class="table table-bordered" id="table">
            <thead>
              <tr>
                <th>Issue Name</th>
                <th>Issue Description</th>
                <th>Issue Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="todo in todos">
                <td> {{ todo.title }} </td>
                <td> {{ todo.description }} </td>
                <td >{{{ prior(todo.priorty) }}}</td>
                <td > <a class="text-danger" @click="postDelete(todo)"><span class="glyphicon glyphicon-trash"></span> </a></td>
              </tr>
            </tbody>
          </table>    
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12" style="min-height:40px">
      <div v-if="status!=''" class="col-lg-2"> 
        {{ status }} 
      </div>
      <div v-if="status!=''" class="spinner col-lg-2">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
  </div>
  <div class="row" id="form">
    <div class="col-lg-12" v-show="clickadd">
      <div class="row">
        <form class="col-lg-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Issue Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Name" v-model="issueTitle">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Issue Description</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Description" v-model="issueDescription">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Issue Priorty</label>
            <select class="form-control" v-model="issuePriorty">
                <option value="5">Highest</option>
                <option value="4">High</option>
                <option value="3">Normal</option>
                <option value="2">Low</option>
                <option value="1">Lowest</option>

            </select>
          </div>          
        </form>
      </div>
    </div>

    <div class="col-lg-12">
      <button type="submit" class="btn btn-success" v-show="clickadd" v-on:click="postNew()">
        Submit
      </button>
      <button class="btn btn-danger" v-show="clickadd" v-on:click="clickAdd()">
        Cancel
      </button>      
      <button class="btn btn-success" v-on:click="clickAdd()" v-show="!clickadd">
        <span class="glyphicon glyphicon-pencil"></span>Add New
      </button>
    </div>
  </div>

</template>

<script>

  module.exports = {

    ready : function(){
      
      this.$parent.title ='Foo';
    
    },

    data: function () {
      
      return { 
  
        todos :{} ,
  
        clickadd : false,

        data : 0,

        status : ''
  
      }

    },
    methods : {

      clickAdd : function(){
        
        this.clickadd=!this.clickadd;
      
      },
      postDelete : function(todo) {

        var that = this;

        that.status='deleting ..... !';
        
        that.$http.delete('/api/'+todo.id,function (data, status, request) {
        
        }).success(function (data, status, request) {
            
            that.todos.$remove(todo);
            setTimeout(function () {
              that.status='';
            },1000);

        }); 

      },
      postNew : function() {

        var that = this;

        var data={ title : this.issueTitle , description : this.issueDescription , priorty : this.issuePriorty };
        
        that.$http.post('/api',data ,function (data, status, request) {
        
        }).success(function (data, status, request) {
            
            this.clickadd=!this.clickadd;
            
            that.todos.push(data);

            that.issueTitle='';

            that.issueDescription='';

        }); 

      },

      prior : function (priorty) {
      
        if(priorty==5){

          return '<span class="text-success">Highest</span>';
        }
       
        if(priorty==4){

          return '<span class="text-success">High</span>';
        }
        
        if(priorty==3){

          return '<span class="text-warning">Normal</span>';
        }

        if(priorty==2){

          return '<span class="text-danger">Low</span>';
        }

        else{

          return '<span class="text-danger">Lowest</span>';
        }
            
      }
    
    },
    route: {
      
      activate: function () {

        var that=this;

        that.$http.get('/api', function (data, status, request) {
        
        }).success(function (data, status, request) {
        
            that.todos=data;

        });      
      }
    }     

  }
</script>