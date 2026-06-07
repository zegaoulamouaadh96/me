import React, { useEffect, useRef } from 'react';

const CODE_SNIPPETS = [
  // Cybersecurity & Networking
  'nmap -sS -A -T4 192.168.1.1',
  'iptables -A INPUT -p tcp --dport 80 -j ACCEPT',
  'nc -lvp 4444 -e /bin/bash',
  'openssl req -new -newkey rsa:4096 -nodes',
  'hashcat -m 1800 shadow.txt wordlist.txt',
  'ssh -i id_rsa root@10.0.0.15',
  'hydra -l admin -P pass.txt ssh://10.0.0.1',
  'sqlmap -u "target.com/vuln.php?id=1" --dbs',
  'airmon-ng start wlan0',
  'gpg --encrypt --recipient admin@secure.net doc.txt',
  '[SECURED] Connection established.',
  '[WARNING] Unresolved threat detected on port 22.',
  '[SYSTEM] Encrypting data block with AES-256-GCM...',
  
  // AI & Machine Learning
  'model.fit(X_train, y_train, epochs=50, batch_size=32)',
  'tf.keras.layers.Dense(256, activation="relu")',
  'loss = tf.keras.losses.SparseCategoricalCrossentropy()',
  'optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)',
  'pred = model.predict(image_batch)',
  'import torch; import torch.nn as nn',
  'class ConvNet(nn.Module): def __init__(self):',
  'self.conv1 = nn.Conv2d(1, 32, 3, 1)',
  'optimizer = torch.optim.SGD(model.parameters(), lr=0.01)',
  'embeddings = openai.embeddings.create(input=text)',
  'agent = DQNAgent(state_size, action_size)',
  '[AI] Neural network weights converged.',
  
  // System & Web Development
  'npm run dev --port 5174',
  'git commit -am "fix: patch buffer overflow vuln"',
  'docker run -d -p 80:80 nginx:alpine',
  'const token = jwt.sign({ userId: user.id }, SECRET)',
  'app.use(helmet()); // secure headers',
  'res.status(200).json({ status: "secured" });',
  'const rateLimiter = rateLimit({ windowMs: 15 * 60 * 1000 });',
  'const decrypted = crypto.privateDecrypt(privateKey, buffer);',
  'const hash = crypto.createHmac("sha256", secret).update(data).digest("hex");'
];

const BINARY_CHARS = '01'.split('');
const HEX_CHARS = '0123456789ABCDEF'.split('');
const MATRIX_CHARS = [...BINARY_CHARS, ...HEX_CHARS];

export default function BackgroundParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let horizontalLines = [];
    let verticalColumns = [];
    const maxHorizontalLines = 35; // Floating code lines
    const colWidth = 32; // Column width for vertical binary rain

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-initialize columns on resize
      const columnsCount = Math.ceil(canvas.width / colWidth);
      verticalColumns = [];
      for (let i = 0; i < columnsCount; i++) {
        verticalColumns.push({
          x: i * colWidth,
          y: Math.random() * -canvas.height * 1.5, // Start off-screen at different offsets
          speed: Math.random() * 2.2 + 1.8, // Slightly faster descent
          fontSize: Math.floor(Math.random() * 4) + 12, // 12px to 15px
        });
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize horizontal floating code lines
    for (let i = 0; i < maxHorizontalLines; i++) {
      const isRightToLeft = Math.random() > 0.5;
      horizontalLines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
        fontSize: Math.floor(Math.random() * 5) + 14, // 14px to 18px (more visible)
        speedX: (Math.random() * 0.6 + 0.3) * (isRightToLeft ? -1 : 1),
        speedY: (Math.random() - 0.5) * 0.05, // very slight vertical drift
        alpha: Math.random() * 0.3 + 0.22, // 22% to 52% opacity for clear visibility
        isSpecial: Math.random() > 0.8, // 20% have special brightness/cursor
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ─────────────────────────────────────────────────────────
      // 1. Draw Vertical Binary/Hex Matrix Rain (Faint Layer)
      // ─────────────────────────────────────────────────────────
      verticalColumns.forEach((col) => {
        // Draw the tail of characters
        const tailLength = 12;
        for (let i = 0; i < tailLength; i++) {
          const drawY = col.y - i * col.fontSize;
          
          // Only draw if inside visible height
          if (drawY > -20 && drawY < canvas.height + 20) {
            // Select character from MATRIX_CHARS
            const charIndex = Math.floor((Math.abs(col.y) / col.fontSize + i) % MATRIX_CHARS.length);
            const char = MATRIX_CHARS[charIndex];

            // Fade opacity along the tail (much brighter than before)
            let alpha = (1 - i / tailLength) * 0.22;
            
            if (i === 0) {
              // Brighter head for the stream
              ctx.fillStyle = `rgba(255, 100, 100, ${alpha * 2})`;
            } else {
              // Classic cyber red
              ctx.fillStyle = `rgba(255, 42, 42, ${alpha})`;
            }

            ctx.font = `${col.fontSize}px "Fira Code", monospace`;
            ctx.fillText(char, col.x, drawY);
          }
        }

        // Update y position
        col.y += col.speed;

        // Reset column if it goes completely past screen
        if (col.y - tailLength * col.fontSize > canvas.height) {
          col.y = Math.random() * -150 - 50;
          col.speed = Math.random() * 2.2 + 1.8;
        }
      });

      // ─────────────────────────────────────────────────────────
      // 2. Draw Horizontal Programming Code Streams (Readable Layer)
      // ─────────────────────────────────────────────────────────
      horizontalLines.forEach((line) => {
        // Determine final display text
        let displayText = line.text;
        let lineAlpha = line.alpha;
        
        let colorString = `rgba(255, 42, 42, ${lineAlpha})`; // default red

        if (line.isSpecial) {
          // Special bright lines have cursor blinking and higher opacity
          const hasCursor = Math.floor(Date.now() / 350) % 2 === 0;
          displayText += hasCursor ? ' █' : '  ';
          lineAlpha = Math.min(line.alpha * 1.6, 0.85); // cap at 85% opacity
          
          // Draw special lines in white/light pink for high-end glowing contrast
          colorString = `rgba(255, 230, 230, ${lineAlpha})`;
        }

        // Set font size & styling
        ctx.font = `${line.isSpecial ? '500 ' : ''}${line.fontSize}px "Fira Code", monospace`;
        ctx.fillStyle = colorString;
        
        ctx.fillText(displayText, line.x, line.y);

        // Update coordinates
        line.x += line.speedX;
        line.y += line.speedY;

        // Wrap around screen boundaries
        if (line.speedX > 0 && line.x > canvas.width + 100) {
          line.x = -400;
          line.y = Math.random() * canvas.height;
          line.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        } else if (line.speedX < 0 && line.x < -400) {
          line.x = canvas.width + 100;
          line.y = Math.random() * canvas.height;
          line.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        }

        // Keep vertical drift inside screen
        if (line.y < 0) line.y = canvas.height;
        if (line.y > canvas.height) line.y = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0, // behind everything
        opacity: 0.9, // slightly higher opacity for the canvas
        backgroundColor: '#000000', // ensure pure black base
      }}
    />
  );
}
