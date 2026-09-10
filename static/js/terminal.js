// Michael DeVito II



const fs = {
	'/': {
		type: 'dir',
		children: [
			{ name: 'certs', path: '/certs' },
			{ name: 'coursework', path: '/coursework' },
			{ name: 'projects', path: '/projects' },
			{ name: 'resume.txt', path: '/resume.txt' },
		],
	},
	'/certs': {
		type: 'dir',
		children: [
			{ name: 'security-plus.md', path: '/certs/security-plus.md' },
			{ name: 'network-plus.md', path: '/certs/network-plus.md' },
			{ name: 'linux-plus.md', path: '/certs/linux-plus.md' },
		],
	},
	'/certs/security-plus.md': { type: 'file' },
	'/certs/network-plus.md': { type: 'file' },
	'/certs/linux-plus.md': { type: 'file' },

	'/coursework': {
		type: 'dir',
		children: [
			{ name: 'northwind-designs.md', path: '/coursework/northwind-designs.md' },
		],
	},
	'/coursework/northwind-designs.md': { type: 'file' },

	'/projects': {
		type: 'dir',
		children: [
			{ name: 'homelab.md', path: '/projects/homelab.md' },
		],
	},
	'/projects/homelab.md': { type: 'file' },

	'/resume.txt': { type: 'file' },
};


function parentOf(path) {
	if (path === '/') return null;
	const parts = path.split('/').filter(Boolean);
	parts.pop();
	return parts.length ? '/' + parts.join('/') : '/';
}

function renderTerminal(path) {
	const node = fs[path];
	const term = document.getElementById('terminal');
	term.innerHTML = '';

	const cdLine = document.createElement('p');
	cdLine.className = 'term-line';
	cdLine.innerHTML = path === '/'
		? 'guest@mdevito:~<span class="path">$ cd /var/log/michael</span>'
		: `guest@mdevito:/var/log/michael<span class="path">$ cd ${path}</span>`;
	term.appendChild(cdLine);

	if (node.type === 'dir') {
		const lsLine = document.createElement('p');
		lsLine.className = 'term-line';
		lsLine.innerHTML = '<span class="path">$ ls -l</span>';
		term.appendChild(lsLine);

		const listing = document.createElement('div');
		listing.className = 'term-listing';

		if (path !== '/') {
			const up = document.createElement('a');
			up.href = '#' + parentOf(path);
			up.dataset.path = parentOf(path);
			up.innerHTML = '<span class="perm">drwxr-xr-x</span>..';
			listing.appendChild(up);
		}

		node.children.forEach(child => {
			const isDir = fs[child.path].type === 'dir';
			const a = document.createElement('a');
			a.href = '#' + child.path;
			a.dataset.path = child.path;
			a.innerHTML = `<span class="perm">${isDir ? 'drwxr-xr-x' : '-rw-r--r--'}</span>${child.name}${isDir ? '/' : ''}`;

