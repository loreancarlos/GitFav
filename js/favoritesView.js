import { Favorites } from "./favorites.js";


export class FavoritesView extends Favorites {
   constructor(root) {
      super(root);
      this.update();
      this.onAdd();
   }

   update() {
      this.removeAllRow();
      this.favAccounts.forEach(account => {
         const row = this.createRow();
         row.querySelector("td .user-wrapper img").src = `https://github.com/${account.login}.png`;
         row.querySelector("td .user-wrapper img").alt = `Foto de ${account.name}`;
         row.querySelector("td .user-wrapper .name-wrapper a").href = `https://github.com/${account.login}`;
         row.querySelector("td .user-wrapper .name-wrapper a p:first-child").textContent = account.name;
         row.querySelector("td .user-wrapper .name-wrapper a p:last-child").textContent = `/${account.login}`;
         row.querySelector("td:nth-child(2)").textContent = account.public_repos;
         row.querySelector("td:nth-child(3)").textContent = account.followers;
         row.querySelector("td:last-child p").onclick = () => {
            const isOK = confirm("Tem certeza que deseja remover este usuário da sua lista de Favoritos?");
            if (isOK) {
               this.delete(account);
               this.update();
            }
         };
         this.tbody.append(row);
      });
      !this.favAccounts.length ? this.tbody.style.backgroundImage = "url('img/bgTable.svg')" : this.tbody.style.backgroundImage = "none";
      this.favAccounts.length > 5 ? this.tbody.classList.add("scroll-y") : this.tbody.classList.remove("scroll-y");
   }

   createRow() {
      const tr = document.createElement("tr");
      tr.innerHTML = ` 
      <td>
         <div class="user-wrapper">
            <img src="" alt="">
            <div class="name-wrapper">
               <a href="" target="_blank">
                  <p></p>
                  <p></p>
               </a>
            </div>
         </div>
      </td>
      <td></td>
      <td></td>
      <td>
         <p>Remover</p>
      </td>
      `;
      return tr;
   }

   removeAllRow() {
      this.tbody.querySelectorAll("tr").forEach(row => {
         row.remove();
      });
   }

   onAdd() {
      const buttonSearch = this.root.querySelector("header .search-wrapper button");
      const inputSearch = this.root.querySelector("header .search-wrapper input");

      buttonSearch.onclick = () => {
         const { value } = inputSearch;
         inputSearch.value = "";
         this.add(value);
      };

      inputSearch.onkeydown = (event) => {
         if (event.keyCode === 13) {
            buttonSearch.onclick();
         }
      };
   }
}