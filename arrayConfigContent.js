let arrayConfigContent = [
  { "snip_basic_html": `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Document test new</title>
  </head>
  <body>
      
      <script src="script.js"></script>
  </body>
  </html>` },


  { "snip_basic_react_Component": `import React, { useState, useEffect  } from 'react';

  const Component = () => {
  const [value, setValue] = useState('');

  useEffect(() => {

    },[]);

    return (
    <div> 
      Component
    </div>
    );
  };

  export default Component;` },


  { "snip_basic_navbar_tailwind_html": `<nav class="bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold text-white">Logo</span>
        </a>
      <div class="md:hidden  flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button id="menuButton" data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
      </div>
      <div class="flex hidden w-full md:flex md:w-auto md:order-1" id="navbarDrop">
        <ul class="flex flex-col text-center font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 bg-gray-900">
          <li>
            <a href="#" class="block py-2 px-3 md:p-0 text-white hover:text-blue-800">Home</a>
          </li>
          <li>
            <a href="#" class="block py-2 px-3 md:p-0 text-white hover:text-blue-800">About</a>
          </li>
        </ul>
      </div>
      </div>
  </nav>` 
  },
  { 
    "snip_basic_navbar_tailwind_js": `var menuButton = document.getElementById("menuButton");
  var navbarDrop = document.getElementById("navbarDrop");

  menuButton.addEventListener("click", () => {
    var statusDrop = navbarDrop.classList.contains("hidden");
    if(statusDrop){
      navbarDrop.classList.remove("hidden");
    }else{
      navbarDrop.classList.add("hidden");
    }
  });` 
  },
  { "snip_customized_scrollbar": `.customized-scrollbar {
  }

  .customized-scrollbar::-webkit-scrollbar {
      width: 5px;
      height: 8px;
      width: 10px;
      border-radius: 15px;
  }

  .customized-scrollbar::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 15px;
  }` 
  },
  { "snip_favicon_bug": `<link rel="shortcut icon" href="#">` },
  { 
    "snip_github_actions_yml_vanilla": `on: 
    push:
      branches:
        - main
  name: 🚀 Deploy website on push
  jobs:
    web-deploy:
      name: 🎉 Deploy
      runs-on: ubuntu-latest
      steps:
      - name: 🚚 Get latest code
        uses: actions/checkout@v4
      
      - name: 📂 Sync files
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: \${{ secrets.ftp_host }}
          username: \${{ secrets.ftp_user }}
          password: \${{ secrets.ftp_password }}` 
  },
  { 
    "snip_github_actions_yml_react": `on: 
    push:
      branches:
        - main

  name: 🚀 Deploy React App on push

  jobs:
    web-deploy:
      name: 🎉 Deploy
      runs-on: ubuntu-latest

      steps:
      - name: 🚚 Get latest code
        uses: actions/checkout@v4

      - name: 📦 Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16' 

      - name: 📥 Install dependencies
        run: npm install

      - name: 🔨 Build the project
        run: npm run build

      - name: 📂 Sync files
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: \${{ secrets.ftp_host }}
          username: \${{ secrets.ftp_user }}
          password: \${{ secrets.ftp_password }}
          local-dir: dist/  --> usando Vite
          local-dir: build/  --> usando CRA` 
  },
  {
    "snip_csharp_class": `public class ClassName
    {
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
    }`
  },
  { 
    "snip_csharp_crud_endpoint": `private static IResult GetById(int id, ProductService service)
    {
        var item = service.GetById(id);

        return item is null
            ? Results.NotFound()
            : Results.Ok(item);
    }` 
  },
  {
    "snip_csharp_service_method": `public ReturnType MethodName(Parameters)
    {
        // Find entity
        // Validate conditions

        if (/* condition */)
        {
            return /* failure result */;
        }

        // Perform operation

        return /* success result */;
    }`
  },
  {
    "snip_react_fetch_post": `const create = (data) =>
    fetch("/api/endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Request failed");
        return r.json();
      })
      .then((result) => setData(result))
      .catch((error) => console.error(error));`
  },
  {
  "snip_react_fetch_get": `const load = () =>
  fetch("/api/endpoint", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((r) => r.json())
    .then((d) => setData(d));`
}
];
