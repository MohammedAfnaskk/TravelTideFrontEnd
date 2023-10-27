import React from "react";

export function Loading() {
  return (
    // <div className="flex gap-4 flex-wrap justify-center">
    //     {/* <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/173880/loading-arrows.svg" alt="Loading icon" />
    //     <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" />
    //     <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon" />
    //     <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" />
    //     <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/169757/loading-process.svg" alt="Loading icon" />
    //     <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon" /> */}
    //     <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/448500/loading.svg" alt="Loading icon" />
    // </div>

    <body style="margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
      <div class="flex space-x-2 justify-center items-center bg-white dark:invert">
        <span class="sr-only">Loading...</span>
        <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div class="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
    </body>
  );
}
