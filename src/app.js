App = {
    loading: false,
    contracts: {},
  
    load: async () => {
      await App.loadWeb3();
      await App.loadAccount();
      await App.loadContract();
      await App.render();
    },
  
    loadWeb3: async () => {
        if (typeof window.ethereum !== 'undefined') {
          App.web3Provider = window.ethereum;
          window.web3 = new Web3(window.ethereum);
          try {
            // Request account access if needed
            await window.ethereum.enable();
          } catch (error) {
            console.error('User denied account access.');
          }
        } else if (typeof window.web3 !== 'undefined') {
          App.web3Provider = window.web3.currentProvider;
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
      },
  
    loadAccount: async () => {
      // Set the current blockchain account
      const accounts = await window.web3.eth.getAccounts();
      App.account = accounts[0];
      console.log(App.account);
    },
  
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const todoList = await $.getJSON('TodoList.json')
      App.contracts.TodoList = TruffleContract(todoList)
      App.contracts.TodoList.setProvider(App.web3Provider)
  
      // Hydrate the smart contract with values from the blockchain
      App.todoList = await App.contracts.TodoList.deployed()
    },
      
  
    render: async () => {
      // Prevent double render
      if (App.loading) {
        return;
      }
  
      // Update app loading state
      App.setLoading(true);
  
      // Render Account
      $('#account').html(App.account);
  
      // Render Tasks
      await App.renderTasks();
  
      // Update loading state
      App.setLoading(false);
    },
  
    renderTasks: async () => {
      // Load the total task count from the blockchain
      const taskCount = await App.todoList.taskCount();
      const $taskTemplate = $('.taskTemplate');
  
      // Render out each task with a new task template
      for (let i = 1; i <= taskCount.toNumber(); i++) {
        // Fetch the task data from the blockchain
        const task = await App.todoList.tasks(i);
        const taskId = task[0].toNumber();
        const taskContent = task[1];
        const taskCompleted = task[2];
  
        // Create the HTML for the task
        const $newTaskTemplate = $taskTemplate.clone();
        $newTaskTemplate.find('.content').html(taskContent);
        $newTaskTemplate.find('input')
          .prop('name', taskId)
          .prop('checked', taskCompleted)
          .on('click', () => App.toggleCompleted(taskId));
  
        // Put the task in the correct list
        if (taskCompleted) {
          $('#completedTaskList').append($newTaskTemplate);
        } else {
          $('#taskList').append($newTaskTemplate);
        }
  
        // Show the task
        $newTaskTemplate.show();
      }
    },
  
    createTask: async () => {
      App.setLoading(true);
      const content = $('#newTask').val();
      const fromAddress = App.account; 
      try {
        await App.todoList.createTask(content, { from: fromAddress });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    
  
    toggleCompleted: async (taskId) => {  
      App.setLoading(true);
      const fromAddress = App.account;
      try {
        await App.todoList.toggleCompleted(taskId, { from: fromAddress });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    
  
    setLoading: (boolean) => {
      App.loading = boolean;
      const loader = $('#loader');
      const content = $('#content');
      if (boolean) {
        loader.show();
        content.hide();
      } else {
        loader.hide();
        content.show();
      }
    }
  };
  
  $(() => {
    $(window).on('load', () => {
      App.load();
    });
  });
  