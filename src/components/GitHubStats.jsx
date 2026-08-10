import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaFolderOpen } from 'react-icons/fa';

export default function GitHubStats({ username = 'kanhaiyapatel59' }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        setLoading(true);
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        // Calculate stars & language frequencies
        let starsCount = 0;
        const languages = {};

        reposData.forEach((repo) => {
          starsCount += repo.stargazers_count || 0;
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });

        const totalReposWithLang = Object.values(languages).reduce((a, b) => a + b, 0);
        const topLangs = Object.entries(languages)
          .map(([lang, count]) => ({
            name: lang,
            percentage: Math.round((count / totalReposWithLang) * 100)
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4);

        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars: starsCount,
          topLangs,
          avatarUrl: userData.avatar_url,
          profileUrl: userData.html_url
        });
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, [username]);

  if (error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card glow-border p-6 rounded-2xl border border-white/10 mt-8"
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF]">
            <FaGithub size={22} />
          </div>
          <div>
            <h4 className="font-bold text-lg leading-tight" style={{ color: 'var(--text-primary)' }}>
              GitHub Live Metrics
            </h4>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Real-time sync from @{username}
            </p>
          </div>
        </div>
        <a
          href={stats?.profileUrl || `https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary text-xs px-3 py-1.5 inline-flex items-center gap-1.5"
        >
          <span>View Profile</span> ↗
        </a>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                <FaFolderOpen className="text-cyan-400" /> Repositories
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {stats.publicRepos}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                <FaStar className="text-yellow-400" /> Total Stars
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {stats.totalStars}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                <FaUsers className="text-indigo-400" /> Followers
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {stats.followers}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                <FaCodeBranch className="text-green-400" /> Following
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {stats.following}
              </div>
            </div>
          </div>

          {/* Top Languages Percentage Breakdown */}
          {stats.topLangs.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                Top Languages
              </p>
              <div className="space-y-2">
                {stats.topLangs.map((lang) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                      <span>{lang.name}</span>
                      <span>{lang.percentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-500"
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
