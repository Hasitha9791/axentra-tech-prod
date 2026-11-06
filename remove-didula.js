const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const indexPath = path.join(ROOT, 'index.html');

console.log("Verifying Team section in index.html...");

const EXPECTED_TEAM_GRID = `<div class="team-grid">
          <article class="team-card team-card--founder" data-aos="fade-up" data-aos-delay="0">
            <div class="team-avatar av-blue">WW</div>
            <div class="team-info">
              <h3>WMHS Weerasinghe</h3>
              <span class="team-role">CEO &amp; Founder</span>
              <p>Visionary leader in tech strategy and digital transformation. Passionate about building scalable web and mobile solutions that create real impact for businesses.</p>
              <div class="team-social">
                <a href="https://www.linkedin.com/company/axentra-tech-software-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github"></i></a>
              </div>
            </div>
          </article>

          <article class="team-card" data-aos="fade-up" data-aos-delay="100">
            <div class="team-avatar av-green">MU</div>
            <div class="team-info">
              <h3>M. Udayangani</h3>
              <span class="team-role">Lead Business Analyst</span>
              <p>Bridges business needs and technology solutions — analyzing requirements, defining processes, and ensuring every project delivers measurable real-world value to clients.</p>
              <div class="team-social">
                <a href="https://www.linkedin.com/company/axentra-tech-software-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </article>

          <article class="team-card" data-aos="fade-up" data-aos-delay="200">
            <div class="team-avatar av-teal">KS</div>
            <div class="team-info">
              <h3>K. Sandaruwan</h3>
              <span class="team-role">Senior Software Engineer</span>
              <p>Full-stack developer with deep expertise in building robust, scalable web and mobile applications using modern frameworks and clean architecture principles.</p>
              <div class="team-social">
                <a href="https://www.linkedin.com/company/axentra-tech-software-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github"></i></a>
              </div>
            </div>
          </article>

          <article class="team-card" data-aos="fade-up" data-aos-delay="300">
            <div class="team-avatar av-purple">GN</div>
            <div class="team-info">
              <h3>Gayan Nadeesha</h3>
              <span class="team-role">Project Manager</span>
              <p>Keeps projects on track, on time, and within scope — coordinating teams, managing timelines, and ensuring seamless communication between clients and developers.</p>
              <div class="team-social">
                <a href="https://www.linkedin.com/company/axentra-tech-software-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </article>
        </div>`;

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Replace the team-grid contents directly with the full 4 members (excluding Didula Nanayakkara)
  const teamGridRegex = /<div class="team-grid">[\s\S]*?<\/div>(\s*<\/div>\s*<\/section>)/i;
  
  if (teamGridRegex.test(html)) {
    html = html.replace(teamGridRegex, `${EXPECTED_TEAM_GRID}$1`);
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log("Team section successfully updated with 4 members (WMHS Weerasinghe, M. Udayangani, K. Sandaruwan, Gayan Nadeesha).");
  } else {
    console.log("Could not locate team-grid in index.html");
  }
}
