var pages = ['index', 'about', 'prices', 'contact', 'media'];
var langs = ['lv','en','ru'];

var sm = '\
<?xml version="1.0" encoding="UTF-8"?>\n\
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\
    <url>\n\
        <loc>https://lanser.lv</loc>\n\
        <xhtml:link rel="canonical" href="https://lanser.lv/lv/index" />\n\
    </url>';

for (var page of pages) {
    for (var lang of langs) {
        sm += '\n\
   <url>\n\
        <loc>https://lanser.lv/'+lang+'/'+page+'</loc>';
        for (var other of langs) {
            if (lang !== other) {
             sm += '\n\
        <xhtml:link rel="alternate" hreflang="'+other+'" href="https://lanser.lv/'+other+'/'+page+'"/>';
            }
        }
        sm += '\n\
   </url>';
    }
}
sm += '\n</urlset>';

require('fs').writeFile('sitemap.xml', sm , function(err) {
    if (err) throw err;
});