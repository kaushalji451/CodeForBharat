const sampledata = [
  {
    question: "What is the primary objective of SPIN selling methodology?",
    options: [
      "Promote urgency through discounts",
      "Deliver a product-focused pitch",
      "Identify customer problems and build value through need discovery",
      "Push customers directly to close",
    ],
    correctAns:
      "Identify customer problems and build value through need discovery",
    questiontype: "business_role",
  },
  {
    question:
      "In enterprise sales, which stakeholder type is most likely to block a deal late in the cycle?",
    options: [
      "Influencer",
      "Procurement gatekeeper",
      "Product user",
      "SDR (Sales Development Rep)",
    ],
    correctAns: "Procurement gatekeeper",
    questiontype: "business_role",
  },
  {
    question: "Which factor best helps shorten a long sales cycle?",
    options: [
      "Increasing ad spend",
      "Replacing cold calls with emails",
      "Pre-qualifying leads with budget and authority filters",
      "Offering freemium models",
    ],
    correctAns: "Pre-qualifying leads with budget and authority filters",
    questiontype: "business_role",
  },
  {
    question: "Which of the following is a lagging sales metric?",
    options: [
      "Calls per day",
      "Closed revenue",
      "Email reply rate",
      "Demo attendance rate",
    ],
    correctAns: "Closed revenue",
    questiontype: "business_role",
  },
  {
    question:
      "What is a critical disadvantage of over-segmentation in marketing?",
    options: [
      "Reduced personalization",
      "Increased operational complexity and reduced ROI",
      "Higher organic traffic",
      "Lower ad spend",
    ],
    correctAns: "Increased operational complexity and reduced ROI",
    questiontype: "business_role",
  },
  {
    question:
      "In a saturated market, which positioning strategy works best for differentiation?",
    options: [
      "Cost leadership",
      "Value innovation",
      "Mass marketing",
      "Basic targeting",
    ],
    correctAns: "Value innovation",
    questiontype: "business_role",
  },
  {
    question:
      "Which type of marketing strategy is best suited for launching a high-involvement product?",
    options: [
      "Transactional marketing",
      "Viral marketing",
      "Educational content-driven marketing",
      "Flash sale campaigns",
    ],
    correctAns: "Educational content-driven marketing",
    questiontype: "business_role",
  },
  {
    question:
      "Which metric is most indicative of brand health over the long term?",
    options: ["CPA", "CTR", "Net Promoter Score (NPS)", "Email open rate"],
    correctAns: "Net Promoter Score (NPS)",
    questiontype: "business_role",
  },
  {
    question: "Which KPI best measures CRM's impact on customer retention?",
    options: [
      "Lead velocity rate",
      "Repeat purchase rate",
      "Website visits",
      "Cold email response rate",
    ],
    correctAns: "Repeat purchase rate",
    questiontype: "business_role",
  },
  {
    question:
      "Which feature is most critical for CRMs handling long B2B sales cycles?",
    options: [
      "Custom pipeline stages with task reminders",
      "Embedded video calling",
      "Gamified UI for reps",
      "Predictive texting for notes",
    ],
    correctAns: "Custom pipeline stages with task reminders",
    questiontype: "business_role",
  },
  {
    question: "What is a primary cause of CRM implementation failure in SMEs?",
    options: [
      "Expensive features",
      "Low user adoption due to complexity",
      "Inadequate dashboards",
      "Cloud hosting issues",
    ],
    correctAns: "Low user adoption due to complexity",
    questiontype: "business_role",
  },
  {
    question: "Which paid strategy is best for bottom-of-funnel conversion?",
    options: [
      "Awareness-focused video ads",
      "Retargeting campaigns with dynamic product ads",
      "Lookalike audience testing",
      "Podcast sponsorships",
    ],
    correctAns: "Retargeting campaigns with dynamic product ads",
    questiontype: "business_role",
  },
  {
    question:
      "Which metric indicates your Google Ads landing page needs optimization?",
    options: [
      "High bounce rate",
      "High CTR",
      "Low impressions",
      "High Quality Score",
    ],
    correctAns: "High bounce rate",
    questiontype: "business_role",
  },
  {
    question:
      "Which attribution model gives full credit to the last customer interaction?",
    options: [
      "Last-click attribution",
      "Linear attribution",
      "Time-decay attribution",
      "Position-based attribution",
    ],
    correctAns: "Last-click attribution",
    questiontype: "business_role",
  },
  {
    question:
      "Which tactic most directly supports organic SEO improvement over time?",
    options: [
      "Paid press releases",
      "Publishing high-quality, keyword-rich content regularly",
      "Weekly ad campaign refresh",
      "Short-form Instagram reels",
    ],
    correctAns: "Publishing high-quality, keyword-rich content regularly",
    questiontype: "business_role",
  },
  {
    question:
      "Which platform's algorithm prioritizes professional engagement for B2B outreach?",
    options: ["Instagram", "LinkedIn", "Facebook", "Reddit"],
    correctAns: "LinkedIn",
    questiontype: "business_role",
  },
  {
    question:
      "What is the best way to track direct ROI from Instagram campaigns?",
    options: [
      "Hashtag usage",
      "UTM links and conversions in Google Analytics",
      "Post likes",
      "Follower growth",
    ],
    correctAns: "UTM links and conversions in Google Analytics",
    questiontype: "business_role",
  },
  {
    question:
      "Which strategy is most effective for increasing repeat purchases in D2C ecommerce?",
    options: [
      "Personalized email flows based on purchase history",
      "Social media giveaways",
      "Exit pop-ups",
      "Home page redesign",
    ],
    correctAns: "Personalized email flows based on purchase history",
    questiontype: "business_role",
  },
  {
    question:
      "What’s the most common cause of high cart abandonment in mobile ecommerce?",
    options: [
      "High-quality images",
      "Complicated checkout process",
      "Excessive product reviews",
      "Color scheme",
    ],
    correctAns: "Complicated checkout process",
    questiontype: "business_role",
  },
  {
    question: "Which pricing model is most aligned with maximizing CLTV?",
    options: [
      "One-time purchase",
      "Cost-plus pricing",
      "Subscription-based pricing",
      "Seasonal discounting",
    ],
    correctAns: "Subscription-based pricing",
    questiontype: "business_role",
  },
  {
    question:
      "Which of the following MongoDB query operators can be used to perform full-text search?",
    options: ["$in", "$text", "$regex", "$match"],
    correctAns: "$text",
    questiontype: "technical_role",
  },
  {
    question: "How can you prevent NoSQL injection in a Node.js + MongoDB API?",
    options: [
      "Use ORM only",
      "Sanitize and validate inputs manually or using libraries like express-validator",
      "Use POST requests instead of GET",
      "Disable MongoDB logs",
    ],
    correctAns:
      "Sanitize and validate inputs manually or using libraries like express-validator",
    questiontype: "technical_role",
  },
  {
    question:
      "In a high-performance Express.js API, which middleware technique improves throughput?",
    options: [
      "Place logging after response",
      "Use compression, helmet, and morgan wisely",
      "Avoid async/await",
      "Disable request body parsing",
    ],
    correctAns: "Use compression, helmet, and morgan wisely",
    questiontype: "technical_role",
  },
  {
    question: "How can you handle SSR (Server-Side Rendering) in a React app?",
    options: [
      "Use create-react-app as-is",
      "Use Next.js or ReactDOMServer.renderToString()",
      "Use Redux only",
      "Enable CORS in server",
    ],
    correctAns: "Use Next.js or ReactDOMServer.renderToString()",
    questiontype: "technical_role",
  },
  {
    question: "Which MongoDB index types are supported for geospatial queries?",
    options: ["Hashed index", "2dsphere", "2d", "TTL"],
    correctAns: "2dsphere",
    questiontype: "technical_role",
  },
  {
    question:
      "What is the best way to manage secrets in a Node.js + Express app in production?",
    options: [
      "Store secrets in .env and commit to GitHub",
      "Use environment variables and secure key vaults (e.g., AWS Secrets Manager)",
      "Keep them as JSON in config.js",
      "Encrypt passwords only",
    ],
    correctAns:
      "Use environment variables and secure key vaults (e.g., AWS Secrets Manager)",
    questiontype: "technical_role",
  },
  {
    question: "Which lifecycle method is not available in React Hooks?",
    options: [
      "componentDidMount",
      "shouldComponentUpdate",
      "componentDidUpdate",
      "componentWillUnmount",
    ],
    correctAns: "shouldComponentUpdate",
    questiontype: "technical_role",
  },
  {
    question:
      "In a MERN app, when using JWT authentication, which practices improve security?",
    options: [
      "Store JWT in HTTP-only cookies",
      "Store JWT in localStorage only",
      "Use short expiration tokens with refresh flow",
      "Ignore CORS during authentication",
    ],
    correctAns: "Store JWT in HTTP-only cookies",
    questiontype: "technical_role",
  },
  {
    question:
      "Which method allows you to stream large files in Node.js to avoid memory overload?",
    options: [
      "fs.readFileSync()",
      "Buffer.from(file)",
      "fs.createReadStream()",
      "file.pipe()",
    ],
    correctAns: "fs.createReadStream()",
    questiontype: "technical_role",
  },
  {
    question:
      "What is the main benefit of using useMemo() in React applications?",
    options: [
      "Makes components re-render faster",
      "Avoids unnecessary recalculations of expensive operations",
      "Prevents prop drilling",
      "Improves routing speed",
    ],
    correctAns: "Avoids unnecessary recalculations of expensive operations",
    questiontype: "technical_role",
  },
  {
    question: "In MongoDB, what is a correct strategy for schema validation?",
    options: [
      "MongoDB does not support validation",
      "Use MongoDB’s built-in JSON schema validation on collections",
      "Use SQL-style triggers",
      "Always validate on client side only",
    ],
    correctAns: "Use MongoDB’s built-in JSON schema validation on collections",
    questiontype: "technical_role",
  },
  {
    question: "Which header is essential for handling CORS in an Express API?",
    options: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
      "X-Powered-By",
    ],
    correctAns: "Access-Control-Allow-Origin",
    questiontype: "technical_role",
  },
  {
    question:
      "Which command will list all global NPM packages installed on a system?",
    options: [
      "npm list",
      "npm list -g --depth=0",
      "npm global list",
      "npm -g list all",
    ],
    correctAns: "npm list -g --depth=0",
    questiontype: "technical_role",
  },
  {
    question:
      "How do you terminate a running process in Unix/Linux by its name?",
    options: [
      "close -f",
      "pkill process_name",
      "taskkill",
      "exit process_name",
    ],
    correctAns: "pkill process_name",
    questiontype: "technical_role",
  },
  {
    question: "What does the chmod +x file.sh command do?",
    options: [
      "Makes the file executable",
      "Deletes the file",
      "Changes file to read-only",
      "Opens the file",
    ],
    correctAns: "Makes the file executable",
    questiontype: "technical_role",
  },
  {
    question:
      "Which command merges branches in Git while preserving history and avoiding fast-forward?",
    options: [
      "git merge --force",
      "git merge --no-ff",
      "git rebase",
      "git reset",
    ],
    correctAns: "git merge --no-ff",
    questiontype: "technical_role",
  },
  {
    question:
      "Which file format is most commonly associated with storing Digital Signature Certificates?",
    options: [".env", ".pfx / .p12", ".json", ".md"],
    correctAns: ".pfx / .p12",
    questiontype: "technical_role",
  },
  {
    question:
      "Which public infrastructure element ensures DSC cannot be forged?",
    options: [
      "Certificate Authority (CA)",
      "API Gateway",
      "React Context",
      "CSR (Certificate Signing Request)",
    ],
    correctAns: "Certificate Authority (CA)",
    questiontype: "technical_role",
  },
  {
    question: "What happens if a private key used for DSC is compromised?",
    options: [
      "Nothing, it's public anyway",
      "All signed transactions must be reissued with a new key",
      "Only the UI fails",
      "MongoDB shuts down",
    ],
    correctAns: "All signed transactions must be reissued with a new key",
    questiontype: "technical_role",
  },
  {
    question:
      "In web applications, what is the primary role of a Digital Signature Certificate?",
    options: [
      "Encrypt files at rest",
      "Authenticate user identity and ensure message integrity",
      "Increase performance",
      "Track user sessions",
    ],
    correctAns: "Authenticate user identity and ensure message integrity",
    questiontype: "technical_role",
  },
];
module.exports = { data: sampledata };
