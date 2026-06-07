document.addEventListener("DOMContentLoaded", function(){
    const search= document.querySelector(".search");
    const usernameInput = document.querySelector(".input");
    const statscontainer = document.querySelector(".stats_container");
    const easycircle = document.querySelector(".easy");
    const mediumcircle = document.querySelector(".medium");
    const hardcircle = document.querySelector(".hard");
    // const easylabel = document.querySelector(".easy-level");
    // const mediumlabel = document.querySelector(".medium-level");
    // const hardlabel = document.querySelector(".hard-level");
    const easycount = document.querySelector(".easy-count");
    const mediumcount = document.querySelector(".medium-count");
    const hardcount = document.querySelector(".hard-count");
    const statscont = document.querySelector(".scard");

    function validateUsername(username){
        if(username.trim()===""){
            alert("Username can't be empty");
            return false;
        }
        return true;
    }


    async function fetchuser(username) {
       
        
        try{
            const proxyurl = 'https://cors-anywhere.herokuapp.com/'
            const targetUrl = 'https://leetcode.com/graphql/';
            search.textContent=("searching...");
            search.disabled = true;
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: `\n  query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n`,
                 variables: { username: username }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };

            const response = await fetch(proxyurl+targetUrl, requestOptions);

            // const response= await fetch(targetUrl);
            if(!response.ok){
                throw new Error("Unable to fetch data");
            }

            const parseddata = await response.json();
            statscontainer.className="stats_container";
            console.log(parseddata);
            displaydata(parseddata);

        } catch (error) {
            console.error(error);
            alert("check details");
        } finally {
            search.textContent = "Search";
            search.disabled = false;
        }
    }

    function update(solved, total, circle, countLabel){
        const progress_degree = total > 0 ? (solved / total) * 100 : 0;
        const ring = circle.parentElement;
        if (ring) {
            ring.style.setProperty("--progress-deg", `${progress_degree}%`);
        }
        if (countLabel) {
            countLabel.textContent = `${solved}/${total}`;
        }
    }
    function displaydata(parseddata){
        const totalques = parseddata.data.allQuestionsCount[0].count;
        const totaleasy = parseddata.data.allQuestionsCount[1].count;
        const totalmed = parseddata.data.allQuestionsCount[2].count;
        const totalhard = parseddata.data.allQuestionsCount[3].count;

        const solved= parseddata.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const easy= parseddata.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const med= parseddata.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const hard= parseddata.data.matchedUser.submitStats.acSubmissionNum[3].count;

        update(easy, totaleasy, easycircle, easycount);
        update(med, totalmed, mediumcircle, mediumcount);
        update(hard, totalhard, hardcircle, hardcount);


        const cards=[
            {label: "Overall Submissions", value: parseddata.data.matchedUser.submitStats.totalSubmissionNum[0].submissions },
            {label: "Overall Easy Submissions", value: parseddata.data.matchedUser.submitStats.totalSubmissionNum[1].submissions },
            {label: "Overall Medium Submissions", value: parseddata.data.matchedUser.submitStats.totalSubmissionNum[2].submissions },
            {label: "Overall Hard Submissions", value: parseddata.data.matchedUser.submitStats.totalSubmissionNum[3].submissions }
        ];

        
           statscont.innerHTML = cards.map(data => { return `
               <div class="card p-2 m-2 bg-white/70 rounded hover:scale-110 transition-all ease-linear">
                  <h3 class="font-semibold">${data.label}</h3>
                  <p class="text-sm">${data.value}</p>
              </div>
              `}).join('');
        


    }
    
    
    
    search.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log(username);
        if(validateUsername(username)){
            fetchuser(username)
        }
    })


})