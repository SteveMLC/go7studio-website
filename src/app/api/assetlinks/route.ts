import { NextResponse } from "next/server";

// Digital Asset Links for Android App Links verification
// Must be served at /.well-known/assetlinks.json on BOTH www and non-www domains
const assetlinks = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "com.go7studio.empire_tycoon",
      sha256_cert_fingerprints: [
        "9A:19:81:D2:B8:9A:10:7F:81:BF:6A:8E:E4:49:0B:14:AB:FA:EB:D9:67:EC:1A:D6:7E:7F:52:45:8F:90:12:12",
        "B8:C3:D1:A3:5A:79:3B:ED:FD:1A:E1:BC:E9:65:7B:46:D4:28:37:67:70:F4:EA:CF:77:F8:03:C5:6F:B5:7E:8B",
      ],
    },
  },
];

export async function GET() {
  return NextResponse.json(assetlinks, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
