import { githubUser } from "./githubUser.js";

export class Favorites {
   constructor(root) {
      this.root = document.querySelector(root);
      this.tbody = this.root.querySelector(`table tbody`);
      this.load();
   }

   load() {
      this.favAccounts = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
   }

   save() {
      localStorage.setItem("@github-favorites:", JSON.stringify(this.favAccounts));
   }

   async add(username) {
      try {
         const user = await githubUser.search(username);

         if (user.login === undefined) {
            throw new Error("Este usuário não existe");
         }

         this.favAccounts.forEach(account => {
            if (user.login.toLowerCase() == account.login.toLowerCase()) {
               throw new Error("Este usuário já foi favoritado.");
            }
         });

         this.favAccounts = [user, ...this.favAccounts];
         this.update();
         this.save();
      } catch (error) {
         alert(error.message);
      }
   }


   delete(user) {
      this.favAccounts = this.favAccounts.filter(entry => entry.login !== user.login);
      this.save();
   }
}