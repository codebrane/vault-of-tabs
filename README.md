# Vault of Tabs

Have you ever been deep in research in Firefox, following link after link after, sigh, yet another link, only to find you've ended up with, sigh, 100+ tabs open? Quite apart from a valuable historic record of your internetical perambulations, you want to save these tabs for posterity and to perhaps see what you looked at in your dotage. Well here it is, the ideal tool for you. Tab-O-Matic will save all your tabs in a vault of your choosing, in a nice friendly JSON format. If you're so inclined you could pop them into a sqlite3 database perchance? Or simply delve into your Vault of Tabs vaults of horror and grep for something you've forgotten. I just did that in fact and it worked a treat!

When I get round to it, I'll add the ability to restore a Firefox tab mess from your Vault of Tabs vault of horror.

I'll also get round to designing an icon but for now I'm happy to see my tab mess end up in a nice JSON vault using the default Firefox add-on icon.

## Save tabs to local directory
First set the directory in the add-on's preferences, then click on the add-on's button in the toolbar. Either leave the offered vault name as is to store the tabs in a date oriented vault, or choose another name and optionally append the date to it. I rather like a vault name such as:

* What was I thinking-2016-08-07-16-24-39

so I can keep a record of my tab madness over the years. Having said that, you might want to name your tab vault for what you were researching at the time and perhaps add the date. Researching the same topic in a few year's time? No problem, just save your tab mess with the same name, add the date and you can spend endless hours comparing the two vaults to see how your research methods have changed over the years. Or perhaps not.

But enough from me. On with the documentation...

## Saved tabs format

Each tab is saved as a JSON file within its vault corresponding to its index in the Firefox tab mess. Let's say you opened the add-on's preferences and set "Directory to store tab vaults" to /Users/losttheplot/mytabmess. You then hit the add-on button, change the particular tab vault to "Baking a cake" and choose to add the date to the vault name. In that case you'll get:

<pre>
/Users/losttheplot/mytabmess/Baking a cake-2016-08-07-16-24-39/
0.json:
{
  "index": 0,
  "title": "codeBrane Blog",
  "url": "http://codebrane.com/blog/",
  "time": "Sun Aug 07 2016 16:03:27 GMT+0100 (BST)",
  "searchTitle": "codeBrane Blog"
}
1.json and so on...
</pre>

additionally, all tabs are stored in a master JSON file:
<pre>
/Users/losttheplot/mytabmess/Baking a cake-2016-08-07-16-24-39/master.json:
[
  {
    "index": 0,
    "title": "codeBrane Blog",
    "url": "http://codebrane.com/blog/",
    "time": "Sun Aug 07 2016 16:03:27 GMT+0100 (BST)",
    "searchTitle": "codeBrane Blog"
  },
  ...
]
</pre>

## What does all the tab vault gubbins mean?

* index : this is the Firefox tab index. They start at 0, so your first tab will have an index of 0
* title : this is the title from the HTML page the tab contains
* url : the URL of the page the tab contains
* time : the date and time you opened the tab, ouch! that long ago?
* searchTitle : this is the search text that matches the tab's url in your history. Sometimes it's different from title

##@todo

* Restore tabs from Vault of Tabs JSON vault (coming soon...)