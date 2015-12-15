<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en-us" prefix="og: http://ogp.me/ns#">
  <head>
    <link href="http://gmpg.org/xfn/11" rel="profile">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">

    
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">

    <title> Football Data Visualisation D3.Js &middot; Sadique Ali </title>

    
    <link rel="stylesheet" href="http://sdqali.in/css/poole.css">
    <link rel="stylesheet" href="http://sdqali.in/css/syntax.css">
    <link rel="stylesheet" href="http://sdqali.in/css/hyde.css">
    <link rel="stylesheet" href="http://sdqali.in/css/default.min.css">
    <link rel="stylesheet" href="http://sdqali.in/css/custom.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Sans:400,400italic,700|Abril+Fatface">

    
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <script src="https://d26b395fwzu5fz.cloudfront.net/3.3.0/keen.min.js" type="text/javascript"></script>
    <script src="http://sdqali.in/js/parseuri.js" type="text/javascript"></script>
    <script src="http://sdqali.in/js/ua-parser.min.js" type="text/javascript"></script>
    <script src="http://sdqali.in/js/Math.uuid.js" type="text/javascript"></script>

    
    <link href="http://sdqali.in/categories/football-data-visualisation-d3.js/index.xml" rel="alternate" type="application/rss+xml" title="Sadique Ali" />

    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.0.0/highlight.min.js"></script>
    <script type="text/javascript">
      hljs.initHighlightingOnLoad();
    </script>

    <script type="text/javascript">
  var client = new Keen({
    projectId: "566f9f7a96773d75e098bb34", 
    writeKey: "5d41bf4e9b86ee088f2ae748d782f6e40501d9f1807e04cd3c2bea52c276f14416f585877c39785704bdd5407aae393cc8ad601646d2112f8293a0269145baebec15f48e073186173b9e6c82cd3767456296c77a46d23b827c82492116d919e8401dfa84c56f13adac91963575522314",   
    readKey: "57d95890c1893e97bb47ff02d5082242490a5f0585777e5f157ff3c5f01aca1c1e5bdaab91d874668b7154981d14dd5d73e3a54ef3360e93f29ea1b50b36b339e0e0fe063347fa6ce9bf9f1536752fa81bf2e12079a21e2e57312a55260403f09915e11455cb98e69a2dc9094c14184a"      
  });

var uri = parseUri(window.location.href);
var referrer = parseUri(document.referrer);
var uaParser = new UAParser();
client.addEvent("pagehit", {
  "url" : {
    "source" : uri.source,
    "protocol" : uri.protocol,
    "domain" : uri.host,
    "port" : uri.port,
    "path" : uri.path,
    "anchor" : uri.anchor
  },
  "user_agent" : {
    "browser" : uaParser.getBrowser(),
    "engine" : uaParser.getEngine(),
    "os" : uaParser.getOS()
  },
  referrer: {
    "source" : referrer.source,
    "protocol" : referrer.protocol,
    "domain" : referrer.host,
    "port" : referrer.port,
    "path" : referrer.path,
    "anchor" : referrer.anchor
  },
  "session_id" : Math.uuid(),
  "permanent_tracker" : Math.uuid()
});
</script>

  </head>

<body class="theme-base-0b">

<div class="sidebar">
  <div class="container sidebar-sticky">
    <div class="sidebar-about">
      <h1>
	<a href="/">Sadique Ali</a>
      </h1>
      <p class="lead">
       A blog about the Code I write and the Technologies I use. And other things that interest me. 
      </p>
    </div>

    <ul class="sidebar-nav">
      <li><a href="/">Home</a> </li>
      <li><a href="/blog/">Blog</a> </li>
      <li><a href="/about">About</a> </li>
      <li><a href="https://github.com/sdqali">GitHub</a> </li>
      <li><a href="https://twitter.com/sdqali">Twitter</a> </li>
      <li><a href="https://www.linkedin.com/in/sdqali">LinkedIn</a> </li>
      
        <li><a href="/blog/2015/12/14/thoughts-on-open-graph-tags/"> Thoughts on Open Graph tags </a></li>
      
    </ul>

    <p>&copy; 2015. All rights reserved. </p>
  </div>
</div>


  <div class="content container">
    <h1 class="posts">
      Blog Posts
    </h1>
    <ul class="posts">
        
        <li>
          <span><a href="http://sdqali.in/blog/2012/08/15/curse-of-the-community-shield/">Curse of the Community Shield?</a> <time class="pull-right post-list">Wed, Aug 15, 2012</time></span>
        </li>
        
    </ul>
  </div>
</body>
</html>
