/*global chrome*/

console.log("background working");
const linkedInSearchView = "https://www.linkedin.com/jobs/search";
const linkedInListViewURL = "https://www.linkedin.com/jobs/collections";
const linkedInDetailView = "https://www.linkedin.com/jobs/view";

function getJobDescriptionClassName(url) {
  // If the URL starts with the LinkedIn list view URL, return the list view class name, else return the detail view class name.
  return url.startsWith(linkedInListViewURL)
    ? "jobs-search__job-details--container"
    : "jobs-description-content__text";
}

function grabJobDescription(className) {
  const jobDetailsContainer = document.body.querySelector(`.${className}`);
  const jobDetails = jobDetailsContainer.textContent;
  const cleanedJobDetails = jobDetails.replace(/\s\s+/g, " "); //take out empty whitespace
  console.log("cleanedJobDetails", cleanedJobDetails);
  return cleanedJobDetails;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("Event Listener triggered");
  // Check if the tab is fully loaded and active.
  if (changeInfo.status === "complete" && tab.active) {
    // Check if the URL of the tab matches the LinkedIn list or detail view URL.
    if (
      tab.url?.startsWith(linkedInListViewURL) ||
      tab.url?.startsWith(linkedInDetailView) ||
      tab.url?.startsWith(linkedInSearchView)
    ) {
      // Execute the grabJobDescription function on the current tab and store the result in local storage.
      chrome.scripting
        .executeScript({
          target: { tabId: tabId },
          func: grabJobDescription,
          args: [getJobDescriptionClassName(tab.url)],
        })
        .then((queryResult) => {
          //promise chaining done in the background
          chrome.storage.local.set({ jobDescription: queryResult[0].result }); // save the job description to this json storage, using the key "jobDescription"
        });
    }
  }
});
