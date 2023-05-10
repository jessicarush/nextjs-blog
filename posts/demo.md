---
title: 'A demo post to test markdown to html'
date: '2023-05-10'
---

<!-- The above is YAML front-matter -->
<!-- gray-matter can parse this into an object -->

In this post, I want to test how [remark](https://github.com/remarkjs/remark) and [remark-html](https://github.com/remarkjs/remark-html) handles various markdown.

Testing line breaks:

Lines of code converge,  
Whispers of logic entwined,  
Infinite worlds born.  

> This is a blockquote. You can precede each line with `>` if you're using hard returns. Or, if you're soft wrapping, you can just add `>` to the first line.

Here is some `inline code`.

Here is a codeblock:

```javascript
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
```

Unordered list:

* point
* point
* point

Ordered list:

1. item
1. item
1. item

Task list:

- [x] This is a complete item
- [ ] This is an incomplete item
- [ ] This is an incomplete item

---

Table:

id | name | email
-- | ---- | -----
1 | rick | rick@email.com
2 | morty | morty@email.com

Table with alignment syntax:

Default | Left Align | Right Align | Center Align
------- | :--------- | ----------: | :----------:
xxxxxxxxxxxxxxx | xxxxxxxxxxxxxxx | xxxxxxxxxxxxxxx | xxxxxxxxxxxxxxx |

Emoji:

:warning: `:warning:`  
:exclamation: `:exclamation:`  