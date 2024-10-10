// data fetch
// all post
const getAllData = (category) => {
  if (category) {
    fetch(`https://openapi.programming-hero.com/api/retro-forum/posts/?category=${category}`)
      .then(res => res.json())
      .then(data => showAllPost(data.posts))
  }
  else {
    fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
      .then(res => res.json())
      .then(data => showAllPost(data.posts))
  }
}
// latest post
const getLatestPostData = () => {
  fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    .then(res => res.json())
    .then(data => displayLatestPost(data))
}

// display latest post
const displayLatestPost = (data) => {
  data.forEach(post => {
    const latestContainer = document.getElementById('latest-container');
    const div = document.createElement('div');
    div.classList = "card p-8 shadow-xl space-y-4"
    div.innerHTML = `
     <figure>
              <img
                class="p-0 rounded-lg"
                src="${(post.cover_image) ? post.cover_image : "N/A"}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body p-0">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-calendar-days"></i>
                <p class="text-slate-400">${(post.author?.posted_date) ? post.author?.posted_date : "N/A"}</p>
              </div>
              <h2 class="font-bold text-xl">
              ${(post.title) ? post.title : "N/A"}
              </h2>
              <p class="text-slate-400">
              ${(post.description) ? post.description : "N/A"}
              </p>
              <div class="flex items-center gap-2">
                <div>
                  <img class="w-10 h-10 rounded-full" src=" ${(post.profile_image) ? post.profile_image : "N/A"}" alt="" />
                </div>
                <div>
                  <h2 class="font-bold">${(post.author.name) ? post.author.name : "N/A"}</h2>
                  <p class="text-slate-400">${(post.author.designation) ? post.author.designation : "N/A"}</p>
                </div>
              </div>
            </div>
    
    `
    latestContainer.appendChild(div);
  });
}


const showAllPost = (allData) => {
  const postContainer = document.getElementById('post-container');
  postContainer.innerHTML = '';
  allData.forEach(post => {
    // const postContainer = document.getElementById('post-container');
    const div = document.createElement('div');
    div.innerHTML =
      `
        <div
              class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl"
            >
              <div class="indicator">
                <span class="indicator-item badge bg-green-600"></span>
                <div class="avatar">
                  <div class="w-24 rounded-xl">
                    <img
                      src="${post.image}"
                    />
                  </div>
                </div>
              </div>
              <div class="space-y-4 w-full">
                <div class="flex gap-4 *:opacity-60">
                  <p># ${post.category}</p>
                  <p>Author: ${post.author.name}</p>
                </div>
                <h3 class="text-2xl font-bold opacity-70">
                  ${post.title}
                </h3>
                <p class="opacity-40">
                  ${post.description}
                </p>
                <hr class="border border-dashed border-gray-300" />
                <div
                  class="flex justify-between *:font-bold [&amp;>*:not(:last-child)]:opacity-45"
                >
                  <div class="flex gap-4">
                    <div class="space-x-2 flex items-center">
                      <i
                        class="fa-regular fa-comment-dots"
                        aria-hidden="true"
                      ></i>
                      <p>${post.comment_count}</p>
                    </div>
                    <div class="space-x-2 flex items-center">
                      <i class="fa-regular fa-eye" aria-hidden="true"></i>
                      <p>${post.view_count}</p>
                    </div>
                    <div class="space-x-2 flex items-center">
                      <i class="fa-regular fa-clock" aria-hidden="true"></i>
                      <p>${post.posted_time} Min</p>
                    </div>
                  </div>
                  <div class="opacity-100">
                    <button
                      id="addToList" onclick="makeAsRead('${post.description}', '${post.view_count}')"
                      class="addToList btn btn-circle bg-green-500 btn-sm"
                    >
                      <i
                        class="fa-solid fa-envelope-open text-white"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        `
    postContainer.append(div);
  });
}
let count = 0;
// mark as read
const makeAsRead = (des, view) => {
  const markAsReadCount = document.getElementById('markAsReadCounter');
  const archive = document.getElementById("markAsReadContainer");
  const div = document.createElement('div')
  div.classList = "flex justify-between gap-5 bg-white rounded-lg p-4"
  div.innerHTML = `
  <h2 class = "text-lg font font-semibold">${des}<?h2>
  <h2 class = "flex items-center gap-2">
  <i class="fa-regular fa-eye" aria-hidden="true"></i>
  ${view}<?h2>
  `
  archive.append(div);
  count++;
  markAsReadCount.innerHTML = count;
}

// search by category
document.getElementById('searchPostsBtn').addEventListener('click', () => {
  const searchItem = document.getElementById('searchPosts').value;
  getAllData(searchItem);
})



getAllData();
getLatestPostData();