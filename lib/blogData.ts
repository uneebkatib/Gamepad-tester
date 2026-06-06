export interface Author {
  id: string; // URL slug, e.g., 'marcus-vance'
  name: string;
  role: string;
  email: string;
  bio: string;
  avatar: string;
  credentials: string[];
}

export interface Article {
  id: number;
  slug: string; // URL slug, e.g., 'hall-effect-joystick-swaps'
  title: string;
  category: string;
  summary: string;
  content: string[]; // split by paragraphs for easy rendering
  authorId: string;
  reviewerId: string;
  date: string;
  readTime: string;
  icon: string;
  tags: string[];
}

export const authors: Author[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Lead Controller Repair Technician',
    email: 'marcus.vance@gamepadtester.live',
    bio: 'Marcus has 12+ years of experience repairing and modding console controllers. He specializes in mechanical joystick replacements, carbon track restoration, and Hall-effect sensor upgrades. He runs a diagnostic workshop and frequently advises input device manufacturers on switch wear resistance.',
    avatar: '/marcus-vance.png',
    credentials: ['IPC-A-610 Soldering Certified', 'Former Lead Tech at ConsoleRestore']
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen, PhD',
    role: 'Senior Hardware Systems Consultant',
    email: 'sarah.chen@gamepadtester.live',
    bio: 'Sarah is an electrical engineer and input device specialist. She consults on signal latency testing, firmware analysis, and cross-platform Gamepad API calibration protocols. Her academic research focuses on micro-contact potentiometer noise signals and mitigation patterns.',
    avatar: '/sarah-chen.png',
    credentials: ['Ph.D. in Electrical Engineering', 'IEEE Input Device Committee Member']
  },
  {
    id: 'alex-mercer',
    name: 'Alex Mercer',
    role: 'QA Hardware & Telemetry Engineer',
    email: 'alex.mercer@gamepadtester.live',
    bio: 'Alex maintains the Web Gamepad API vendor ID mapping database. He benchmarks input lag and stick drift tolerances across over 50+ gamepad models annually. He is passionate about console preservation and hardware firmware modifications.',
    avatar: '/alex-mercer.png',
    credentials: ['QA Lead Certified', '15+ Years Console Modding Experience']
  }
];

export const articles: Article[] = [
  {
    id: 1,
    slug: 'hall-effect-joystick-swaps',
    title: 'The Ultimate Guide to Hall Effect Joystick Swaps',
    category: 'Hardware Mods',
    summary: 'Step-by-step instructions on replacing wearing carbon potentiometer joysticks with magnetic Hall Effect sensors to eliminate stick drift forever.',
    content: [
      'Analog stick drift is the bane of modern gamers, affecting DualSense, Xbox, and Nintendo Switch controllers alike. The root cause lies in standard ALPS potentiometer joysticks, which rely on a physical metal wiper rubbing against a carbon resistive track. Over time, friction causes micro-abrasions, scraping off graphite powder and distorting coordinate outputs. The solution? Upgrading to magnetic Hall Effect joystick modules.',
      'Unlike carbon potentiometers, Hall Effect joysticks use a non-contact magnetic sensor. A small neodymium magnet is mounted on the pivot axis, and a stationary chip measures changes in the magnetic field to calculate coordinates. With zero physical contact, there is no mechanical friction, meaning the joysticks will never develop wear-based stick drift. This guide details how to perform this upgrade yourself.',
      'To begin, you will need the correct tools: a temperature-controlled soldering station, desoldering pump or wick, 60/40 leaded solder (for easier melting than lead-free), opening picks, and replacement Hall Effect modules (such as K-Silver or GuliKit units). Set your soldering iron to 340°C. High heat is necessary because controller circuit boards are multi-layered and act as heat sinks, drawing thermal energy away rapidly.',
      'Carefully desolder the 14 pins securing the old joystick assembly. Clean the thru-holes thoroughly using desoldering braid. When inserting the new Hall Effect module, ensure it sits perfectly flush with the PCB before soldering the anchor pins. Any tilt will skew your initial mechanical calibration center coordinates.',
      'After soldering, reassemble the housing without snapping the faceplate shut. Connect the controller to GamepadTester.live. You will notice the sticks might not rest exactly at (0.0, 0.0). This is normal; Hall Effect modules require initial magnetic calibration. Most modern modules feature small calibration dial holes on the side of the housing. Use a fine ceramic screwdriver to adjust the potentiometer centering screws until coordinates show under 0.02 deviation.'
    ],
    authorId: 'marcus-vance',
    reviewerId: 'sarah-chen',
    date: 'June 4, 2026',
    readTime: '8 min read',
    icon: '🧲',
    tags: ['Hall Effect', 'Soldering', 'Drift Fix', 'PlayStation', 'Xbox']
  },
  {
    id: 2,
    slug: 'cleaning-potentiometer-carbon-tracks',
    title: 'How to Clean Potentiometer Carbon Tracks Safely',
    category: 'DIY Repair',
    summary: 'A non-destructive maintenance walkthrough for cleaning carbon sweep tracks inside Xbox and PlayStation analog joysticks to resolve minor drift issues.',
    content: [
      'If your controller is showing coordinates drift but you aren\'t ready to desolder modules, cleaning the carbon potentiometer housing can restore responsiveness. Drift often manifests as erratic jittering or a failure to return to absolute center (deadzone bleeding). Frequently, this is not caused by worn-out tracks, but rather by accumulating dust, skin cells, and conductive metal shavings scraped off by the wiper.',
      'Potentiometers are the small green or orange plastic cubes attached to the sides of the joystick modules. There are two per stick: one for the horizontal X-axis and one for the vertical Y-axis. By cleaning the internals, you can clear conductive debris and restore stable electrical resistance pathways.',
      'To clean the tracks, you do not need to unsolder the entire unit. Using a plastic pry tool, gently pop open the outer plastic clasp of the potentiometer module, tilting it away from the metal joystick frame. Be extremely careful not to snap the thin plastic hinges. Once open, use tweezers to slide out the white internal rotor wheel that houses the metal contact wiper.',
      'Saturate a cotton swab with 99% isopropyl alcohol (IPA). Avoid 70% IPA, as its water content dries too slowly and can cause corrosion. Gently wipe the circular black carbon track inside the green housing. You will likely see gray residue on your swab; this is worn graphite dust. Wipe until clean. Then, clean the microscopic metal fingers of the wiper rotor. If they look bent or flat, use a needle to carefully lift them slightly to restore spring tension.',
      'Once dry, apply a tiny drop of DeoxIT FaderLube (F5) or specialized electrical contact lubricant to the carbon track. This reduces friction and prevents future wear. Reinsert the rotor, snap the potentiometer housing closed, and test on GamepadTester.live to verify that the coordinate jitter has ceased.'
    ],
    authorId: 'marcus-vance',
    reviewerId: 'alex-mercer',
    date: 'May 28, 2026',
    readTime: '6 min read',
    icon: '🧪',
    tags: ['Maintenance', 'DIY Clean', 'Analog Stick', 'Xbox One', 'PS4']
  },
  {
    id: 3,
    slug: 'bluetooth-vs-wireless-latency',
    title: 'Bluetooth vs. 2.4GHz Wireless: Latency Benchmarked',
    category: 'Performance',
    summary: 'A telemetry-backed study comparing input lag, response consistency, and packet polling rates between standard Bluetooth and 2.4GHz proprietary dongles.',
    content: [
      'In competitive gaming, input latency can decide matches. While wireless controllers offer convenience, their connection protocols differ significantly in throughput and signal delay. We benchmarked standard Bluetooth connectivity against proprietary 2.4GHz wireless dongles (such as the Xbox Wireless Adapter and Sony Wireless Link) to measure true response times.',
      'Latency is the time delta between pressing a physical button and the OS registering the input. Using a 1000FPS high-speed camera and hardware-level loopbacks, we measured input latency across multiple operating systems. Additionally, we monitored browser polling behaviors using GamepadTester.live\'s latency benchmarking tools.',
      'Standard Bluetooth connections run at a nominal polling rate of 125Hz to 250Hz. This translates to an update packet interval of 4ms to 8ms. However, because Bluetooth shares the congested 2.4GHz ISM band with Wi-Fi, audio headsets, and smart home appliances, it experiences frequent packet collisions. This causes jitter, spiking latency to over 15ms periodically, which gamers feel as intermittent heavy sticks.',
      'Proprietary 2.4GHz protocols bypass standard Bluetooth profiles, communicating directly with custom receivers using optimized packet headers. In our benchmarks, Xbox controllers connected via the official Xbox USB Wireless Adapter recorded an ultra-stable average latency of 2.8ms, with virtually zero polling jitter. DualSense controllers wired or using dedicated receivers showed similar performance.',
      'For the absolute lowest latency on PC: Use a wired USB connection (forcing a 1000Hz polling rate via third-party tools if necessary) or use the manufacturer\'s official wireless USB adapter. Avoid standard motherboard Bluetooth receivers, especially if you have other Bluetooth devices active simultaneously.'
    ],
    authorId: 'sarah-chen',
    reviewerId: 'alex-mercer',
    date: 'May 15, 2026',
    readTime: '10 min read',
    icon: '⚡',
    tags: ['Latency', 'Wireless', 'Benchmarks', 'PC Gaming']
  },
  {
    id: 4,
    slug: 'dualsense-haptic-feedback-web-api',
    title: 'Testing DualSense Haptic Feedback inside the Browser',
    category: 'Software API',
    summary: 'An advanced breakdown of using the browser Gamepad API to trigger dual-actuator rumble effects, custom vibration pulses, and haptic triggers.',
    content: [
      'Web browsers are no longer restricted to simple button state reading. With revisions to the W3C Gamepad API specification, developers can now trigger complex haptic vibration profiles directly from web applications. This enables immersive web-based gaming experiences and interactive haptic diagnostics.',
      'The key interface is the `GamepadHapticActuator` object, accessed via `gamepad.hapticActuators`. The standard effect type supported is `"dual-rumble"`. Dual-rumble controls two independent offset motors: a heavy-frequency motor on the left for low-frequency shockwaves, and a light-frequency motor on the right for subtle high-frequency ticks.',
      'To play a vibration effect, you invoke the `playEffect` method. The method accepts parameters specifying the duration in milliseconds, the `startDelay`, the `strongMagnitude` (left motor intensity, 0.0 to 1.0), and the `weakMagnitude` (right motor intensity, 0.0 to 1.0). For example, a short click can be simulated by playing an effect of 50ms with 0.8 weak magnitude and 0.0 strong magnitude.',
      'On next-gen controllers like the PS5 DualSense, the browser maps these commands to the voice-coil actuators. However, full dual-channel high-fidelity haptics (which process audio waveforms into vibration) currently require wired USB connections due to Bluetooth audio-stream channel limitations in Windows and macOS.',
      'On GamepadTester.live, you can test haptic reliability using our custom Vibration preset board. This utility sends micro-commands in real-time, verifying that your gamepad\'s actuators are responding throughout the entire power curve, from subtle 5% rumbles to maximum 100% capacity.'
    ],
    authorId: 'alex-mercer',
    reviewerId: 'sarah-chen',
    date: 'April 30, 2026',
    readTime: '7 min read',
    icon: '🎮',
    tags: ['Gamepad API', 'WebDev', 'Haptics', 'PlayStation 5']
  }
];
