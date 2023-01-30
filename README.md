# GithubSearch

## Introduction

GitHub is a very famous service in the field of maintaining and versioning source codes. Many of you use this service on a daily basis. We intend to interact with this service by using the programming interfaces and extract the information of a user.

## Webpage
#### The website you design will follow the diagram below:<br>
<p align="center">
  <img src="https://github.com/BornFromAshes/githubsearch/blob/main/Overview.png"/>
</p>
The middle rectangle should contain all the displayable content. This rectangle should be only the size of the content, but to display it more beautifully, we use layering. What is displayed on the left side of the screen is a user's information extracted through programming interfaces. This information includes the user's picture, the user's full name, the user's blog address, and the user's place of residence. Finally, after this user's bio information is displayed in a box. All this information can be empty, so we should be very careful to check this information.<br>
On the right side of the page, there is a form to enter and send the desired username in the GitHub service. GitHub's programming interface is very extensive. If needed, you can use the following website for more information: <br>
https://docs.github.com/en/rest/reference <br>
To get information about a user, you can send a GET request with the following structure:
```
  https://api.github.com/users/{username}
```

## See for yourself!

The webpage is currenty available at https://bornfromashes.github.io/githubsearch/

All you have to do is type in the username of a github user and you'll get more info about them!

## Known Issues

There aren't currently any issues so far so if you find any please create an issue on this repository.
also this was my first time working with HTML, CSS and JS so the way that I wrote the program might not be the best way possible (probably isn't) so if you can improve this project in any regards I will appreciate that aswell.
