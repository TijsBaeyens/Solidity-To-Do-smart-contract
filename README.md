# Simple Todo List on Ethereum Blockchain

This project is a basic todo list application running on the Ethereum blockchain. It allows users to create tasks, mark them as completed, and view them in a decentralized manner.

## Overview

The application utilizes web3.js to interact with the Ethereum blockchain and a smart contract named `TodoList`. The project's main functionalities include:

- **Loading Ethereum Environment**
  - Initializes and connects to the Ethereum network using MetaMask or similar tools.
- **Account Handling**
  - Retrieves the current account from the connected Ethereum wallet.
- **Smart Contract Interaction**
  - Loads the `TodoList` smart contract from the blockchain and hydrates it with values.
- **Rendering Tasks**
  - Fetches tasks from the blockchain and displays them in the UI, allowing users to see their content and completion status.
- **Creating Tasks**
  - Enables users to add new tasks to the list stored on the Ethereum blockchain.
- **Toggling Task Completion**
  - Allows users to mark tasks as completed or incomplete.

## Prerequisites

Before running this application, ensure you have:

- MetaMask or a compatible Ethereum wallet installed and configured.
- Truffle and Ganache (or a development blockchain) set up if you plan to deploy and interact with the smart contract locally.

## Installation and Setup

1. Clone this repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Deploy the `TodoList` smart contract to your Ethereum network.
4. Update `TodoList.json` with your deployed contract address.
5. Start the application using a local server or hosting solution.
6. Connect your MetaMask wallet to interact with the application.

## Usage

1. Open the application in a browser with MetaMask connected.
2. The tasks from the blockchain will be loaded automatically.
3. Create new tasks by entering text in the provided input field and clicking 'Add Task'.
4. Toggle task completion by clicking the checkbox next to each task.
5. Tasks are updated on the blockchain immediately after toggling completion.

## Note

- Ensure you are connected to the correct Ethereum network and have sufficient ETH for transaction fees when interacting with the application.
- This application is intended for educational purposes and may need adjustments for production use.

## Acknowledgments

This application is based on a tutorial and serves as a demonstration of Ethereum blockchain integration with a simple todo list. Credits to the original tutorial or resources used in building this project.
