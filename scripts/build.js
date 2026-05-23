const { execSync } = require('child_process');

if (process.env.IN_OPEN_NEXT) {
  // Inside the OpenNext build wrapper: compile Next.js normally
  console.log("Executing standard Next.js build inside OpenNext wrapper...");
  try {
    execSync('npx next build', { stdio: 'inherit', env: process.env });
  } catch (error) {
    console.error("Next.js compilation failed:", error);
    process.exit(1);
  }
} else {
  // Outer build entry point: invoke the OpenNext Cloudflare builder with the required version flag
  console.log("Invoking OpenNext Cloudflare build with version bypass flag...");
  
  // Pass the IN_OPEN_NEXT flag down to child processes
  const newEnv = { ...process.env, IN_OPEN_NEXT: 'true' };
  
  try {
    execSync('npx opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion', { stdio: 'inherit', env: newEnv });
  } catch (error) {
    console.error("OpenNext Cloudflare build failed:", error);
    process.exit(1);
  }
}
