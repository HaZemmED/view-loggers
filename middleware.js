import { NextRequest, NextResponse, userAgent } from 'next/server';

const webhook = "https://discord.com/api/webhooks/1216801265485484192/oj90GI8NUNeItKLO4V859YfD9l_DsQTWBU_2Ute3JDbo5qc5JMrpKjkvKV_hqxkAJjeV" // The URL of your Discord/Guilded webhook

export async function middleware(req){
  const ua = userAgent(req)?.ua;
  const source = ["Mozilla/5.0 (compatible; Discordbot/","Twitterbot/"].find(u=>ua?.startsWith(u))
  const page = req.url.split("/").slice(-1)[0]
  await fetch(webhook,{body:JSON.stringify({
    embeds:[{
      title:"Triggered view-logger",
      description:(source ? "Source user-agent: "+ua : "It was loaded an user (or an user on Discord)."),
      footer:{
        text:"Requested page: "+page.slice(0,500),
      },
    }],
  }),headers:{"content-type":"application/json"},method:"POST"})
  if(source){
    // Return the image.
    return NextResponse.rewrite(new URL("/mini.png",req.url))
  }else{
    // Make a message for whoever takes the risk to directly click.
    return NextResponse.rewrite(new URL("/page.html",req.url));
  }
}
