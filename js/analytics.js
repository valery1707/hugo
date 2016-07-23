var client = new Keen({
  projectId: "566f9f7a96773d75e098bb34", // String (required always)
  writeKey: "5d41bf4e9b86ee088f2ae748d782f6e40501d9f1807e04cd3c2bea52c276f14416f585877c39785704bdd5407aae393cc8ad601646d2112f8293a0269145baebec15f48e073186173b9e6c82cd3767456296c77a46d23b827c82492116d919e8401dfa84c56f13adac91963575522314",   // String (required for sending data)
  readKey: "57d95890c1893e97bb47ff02d5082242490a5f0585777e5f157ff3c5f01aca1c1e5bdaab91d874668b7154981d14dd5d73e3a54ef3360e93f29ea1b50b36b339e0e0fe063347fa6ce9bf9f1536752fa81bf2e12079a21e2e57312a55260403f09915e11455cb98e69a2dc9094c14184a"      // String (required for querying data)
});

var uri = parseUri(window.location.href);
var referrer = parseUri(document.referrer);
var uaParser = new UAParser();
var doSendData = true;

if(window.localStorage && localStorage.getItem("localAnalyticsFlag") === "486a8f2d6a5b44f791e729c9e3717a4a") {
  doSendData = false;
}

if(uri.host !== "localhost" && doSendData === true) {
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
} else {
  console.log("Analytics skipped.")
}
