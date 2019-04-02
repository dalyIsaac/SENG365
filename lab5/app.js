// ensures that JSON objects are sent out and read into our client apps
Vue.http.options.emulateJSON = false;

new Vue({
    el: "#app",
    data: {
        users: [],
        username: ""
    },
    mounted: function() {
        this.getUsers();
    },
    methods: {
        getUsers: function() {
            this.$http.get("http://localhost:3000/api/users")
            .then((response) => {
                this.users = response.data;
            }, (err) => {
                console.log(err);
            });
        },
        addUser: function() {
            if (this.username === "") {
                alert("Please enter an username!");
            } else {
                this.$http.post("http://localhost:3000/api/users", {
                    "username": this.username
                });
            }
        },
        deleteUser: function(user) {
            this.$http.delete("http://localhost/api/users/" + user.user_id)
                .then((res) => {
                    const tempid = user.user_id;

                    for (let i = 0; i < this.users.length; i++) {
                        const element = this.users[i];
                        if (tempid === this.users[i].user_id) {
                            this.users.splice(i, 1);
                        }
                    }
                }, (err) => {
                    console.log(err);
                })
        }
    }
});
