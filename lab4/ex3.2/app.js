const app = new Vue({
    el: "#app",
    data: { 
        message: "Hello World!",
        visible: true,
        shopping_list: [
            { name: "bread", price: 2.75 },
            { name: "milk", price: 2.50 },
            { name: "pasta", price: 2.99 },
        ]
    },
})