1.
  function createElemWithText(HTMLElemStrngToCrt = "p", txtContntOfElToCrt = "", classNameifOneNeeded) {
  // Use document.createElement() to create the requested HTML element
  let requestedElementCreated = document.createElement(HTMLElemStrngToCrt);

  // set the textContent of the created element
  requestedElementCreated.textContent = txtContntOfElToCrt;

  // If class name is specified
  if (classNameifOneNeeded) {
    // set the class of created element
    requestedElementCreated.className = classNameifOneNeeded;
  }

  // return the created element
  return requestedElementCreated;
}

2.

function createSelectOptions(users){ 
    //returns undefined if no data parameter is provided. 
    if(users === undefined || users  === null){ 
        return undefined 
    } 
 
    // define an array 
    let optionArray = [] 
     
    var user;
    // for each user of users array 
    for(user of users){ 
        // print user in console 
        console.log(user) 
        // create option  
        var opt = document.createElement('option'); 
 
        // assign user id to option value 
        opt.value = user.id; 
 
        // assign user name to innerhtml of option 
        opt.innerHTML = user.name; 
 
        // add that options to array 
        optionArray.push(opt) 
 
    } 
 
    // return  array 
    return optionArray 
 
}

3.

function toggleCommentSection(postId) {
    // Selects the section element with the data-post-id attribute 
    // equal to the postId received as a parameter
  
  if (!postId) 
  {
                return undefined;
            }
  
    let section = document.querySelector(`section[data-post-id="${postId}"]`);
    // verify if section exist
    if (section) {
        // toggle the class `hide` on the section element
        section.classList.toggle('hide');
    }
    // return the section element
    return section;
}

4.

function toggleCommentButton(postId) {
  // If postId exists
  if (postId) 
  {
    // Get all the buttons on page
    let allThebuttonsOnPage = document.querySelectorAll("button");

    // selected button with data-post-id attribute equal to the postId
    let selectedButtonWithdataPstId;

    
    allThebuttonsOnPage.forEach((eachBtnOnPage) => {
      // If the data-post-id attribute equals the postId
      if (eachBtnOnPage.dataset.postId == postId) 
      {
        
        selectedButtonWithdataPstId = eachBtnOnPage;
      }
    });

    
    if (!selectedButtonWithdataPstId) 
    {
      return null;
    }

    
    if (selectedButtonWithdataPstId.textContent == "Show Comments") 
    {
      
      selectedButtonWithdataPstId.textContent = "Hide Comments";
    }

    
    else if (selectedButtonWithdataPstId.textContent == "Hide Comments")
     {
      
      selectedButtonWithdataPstId.textContent = "Show Comments";
    }

    
    return selectedButtonWithdataPstId;
  }
}

5.

function deleteChildElements(parentElement)
{
  
  if (!parentElement || !parentElement.nodeType){
    return undefined;
  }
 

let child = parentElement.lastElementChild;

while (child)
{
  
parentElement.removeChild(child);
child = parentElement.lastElementChild;
}


return parentElement;
}

6.

function addButtonListeners() {
        const buttons = document.querySelectorAll('main button')
        
        for (const button of buttons){
          const postId = button.dataset.postId;
          button.addEventListener("click", function (e) {toggleComments(e, postId)}, false);
        }


        return buttons; 
    }

7. 

function removeButtonListeners() {
        const buttons = document.querySelectorAll('main button')
        
        for (const button of buttons){
          const postId = button.dataset.postId;
          button.removeEventListener("click", function (e) {toggleComments(e, postId)}, false);
        }


        return buttons; 
    }

8.

function createComments(comments){
  if (!comments)
  {
    return undefined;
  }
  
  let fragment = document.createDocumentFragment();
  
  for(const comment of comments){
    let Article = document.createElement("article");
    
    let h3 = createElemWithText('h3', comment.name);
    
    let p1 = createElemWithText("p", comment.body);
    
    let p2 = createElemWithText('p', `From: ${comment.email}`);
    
    Article.append(h3);
    
    Article.append(p1);
    
    Article.append(p2);
    
    fragment.append(Article);
  }
  
  return fragment;
}

9.

function populateSelectMenu(users) {
  // If usersJSONdataAsprmtr parameter is received
  
  if (users) 
  {
    
    
    let selectMenu = document.querySelector("#selectMenu");

    
    
    let optionsArray = createSelectOptions(users);

 
    
    optionsArray.forEach((elements) => 
                         {
      // appended each option element to the select menu
      
      selectMenu.appendChild(elements);
    });

   
    
    return selectMenu;
  }
}



10.

async function getUsers() {

try
{

const response = await fetch('https://jsonplaceholder.typicode.com/users')

const users = await response.json();

return users;
}
catch(err)
{

console.error(err);

}

}

11.

async function getUserPosts (userId){

        // if userId has nothing
        if (!userId) 
        {
            return;
        }

        let retrieve;

        // try to fetch data for userId
        try {
            retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        } // end try
        catch (error)
         {
            console.log(error);
        } // end catch

        // return information
        return retrieve.json();

    }

12.

async function getUser(userId){

        // if userId has nothing
        if (!userId) 
        {
            return;
        }
        let retrieve;

        // try to fetch data for userId
        try 
        {
            retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        } // end try

        catch (error) 
        {
            console.log(error);
        } // end catch

        // return information
        return retrieve.json();

    }

13.

async function getPostComments(postID)
{

        // if postID has nothing
        if (!postID)
        {

        return;
        }

        let retrieve;

        // try to fetch data for postID
        try 
        {
            retrieve = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}/comments?postId=1`);
        } // end try

        catch (error) 
        {
            console.log(error);
        } // end catch

        // return information
        return retrieve.json();

    }


14.

async function displayComments(postId){
  
  if(!postId)
  {
    return undefined;
  }
  
  let section = document.createElement("section");
  
  section.dataset.postId = postId;
  
 section.classList.add("comments", "hide");
  
  let comments = await getPostComments(postId);
  
  let fragment = createComments(comments);
  
  section.append(fragment)
  
  return section;
}

15.
async function createPosts(posts) 
{
  if(!posts)
  {
    return undefined;
  }
  
    const fragment = document.createDocumentFragment();
  
    for (const post of posts) 
    {
      
        const article = document.createElement('article');
      
        const h2 = createElemWithText('h2', post.title);
      
        const p1 = createElemWithText('p', post.body);
      
        const p2 = createElemWithText('p', `Post ID: ${post.id}`);
      
        const author = await getUser(post.userId);
      
        const p3 = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
      
        const p4 = createElemWithText('p', author.company.catchPhrase);
      
        const button = createElemWithText('button', 'Show Comments');
      
        button.dataset.postId = post.id;
      
        article.append(h2, p1, p2, p3, p4, button);
      
        const section = await displayComments(post.id);
      
        article.append(section);
      
        fragment.append(article);
      
    }
    return fragment;
}

16.
async function displayPosts(posts)
{
    let myMain = document.querySelector("main");
  
    let element = (posts) ? await createPosts(posts) : document.querySelector("main p");
  
    myMain.append(element);
  
    return element;
}


17.

function toggleComments(event, postId)
{
    if (!event || !postId)
    {
        
      return undefined;
    }
  
    event.target.listener = true;
  
    let section  = toggleCommentSection(postId);
  
    let button = toggleCommentButton(postId);
  
    return [section, button];
}

18.

async function refreshPosts(posts)
{
  if (!posts)
  {
  
    return undefined;
    
  }
    
    let buttons = removeButtonListeners();
    
    let myMain = deleteChildElements(document.querySelector("main"));
    
    let fragment = await displayPosts(posts);
    
    let button = addButtonListeners();
    
    return [buttons, myMain, fragment, button];  
}

19.

async function selectMenuChangeEventHandler(e)
{
  if(!e)
  {
    return undefined;
  }
  
    let userId = e?.target?.value || 1;
  
    let posts = await getUserPosts(userId);
  
    let refreshPostsArray = await refreshPosts(posts);
  
    return [userId, posts, refreshPostsArray];
}

20.

async function initPage(){
  
  let users = await getUsers();
  
  let select = populateSelectMenu(users);
  
  return  [users, select];
  
}

21.

function initApp(){
  
    initPage();
  
    let select = document.getElementById("selectMenu");
  
    select.addEventListener("change", selectMenuChangeEventHandler, false);
}

document.addEventListener("DOMContentLoaded", initApp, false);

