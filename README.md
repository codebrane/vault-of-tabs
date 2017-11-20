# Vault of Tabs

Have you ever been deep in research in Firefox, following link after link after, sigh, yet another link, only to find you've ended up with, sigh, 100+ tabs open? Quite apart from a valuable historic record of your internetical perambulations, you want to save these tabs for posterity and to perhaps see what you looked at in your dotage. Well here it is, the ideal tool for you. Vault Of Tabs will save all your tabs in your downloads folder, in a nice friendly JSON format. If you're so inclined you could pop them into a sqlite3 database perchance? Or simply delve into your Vault of Tabs vaults of horror and grep for something you've forgotten. I just did that in fact and it worked a treat!

When I get round to it, I'll add the ability to restore a Firefox tab mess from your Vault of Tabs vault of horror.

I'll also get round to designing an icon but for now I'm happy to see my tab mess end up in a nice JSON vault using the default Firefox add-on icon.

## Save tabs to downloads folder
Just hit the button and the Firefox Save As dialog will open. Vault Of Tabs will suggest a filename but you can choose whatever tickles your fancy. I rather like a vault name such as:

* What was I thinking-2016-08-07-16-24-39

so I can keep a record of my tab madness over the years. Having said that, you might want to name your tab vault for what you were researching at the time and perhaps add the date. Researching the same topic in a few year's time? No problem, just save your tab mess with the same name, add the date and you can spend endless hours comparing the two vaults to see how your research methods have changed over the years. Or perhaps not.

But enough from me. On with the documentation...

## Saved tabs format

All tabs are stored in a JSON file:
<pre>
/Users/losttheplot/Downloads/Baking a cake-2016-08-07-16-24-39.json:
[
  {
    "index": 0,
    "title": "codeBrane Blog",
    "url": "http://codebrane.com/blog/",
    "lastAccessed": "2017-11-16T15:26:34.474Z"
  },
	...
]
</pre>

## What does all the tab vault gubbins mean?

* index : this is the Firefox tab index. They start at 0, so your first tab will have an index of 0
* title : this is the title from the HTML page the tab contains
* url : the URL of the page the tab contains
* lastAccessed : the date and time you last accessed the tab, ouch! that long ago?

##@todo

* Restore tabs from Vault of Tabs JSON vault (coming soon...)