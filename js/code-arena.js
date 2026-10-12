/**
 * 5 F!NGERS - Multi-Language Code Arena Library
 * Created by S1mplee67 (W3NCY?)
 * 
 * Curated programming snippets across 10 developer languages:
 * JavaScript, Python, C#, C++, Java, Rust, Go, SQL, HTML/CSS, and Bash.
 * Designed to build muscle memory for brackets, symbols, arrows, and indentation.
 */

const CodeArena = {
  languages: [
    'javascript',
    'python',
    'csharp',
    'cpp',
    'java',
    'rust',
    'go',
    'sql',
    'html_css',
    'bash'
  ],

  languageMeta: {
    'javascript': { name: 'JavaScript / TypeScript', icon: '🟨' },
    'python': { name: 'Python 3', icon: '🐍' },
    'csharp': { name: 'C# / .NET', icon: '🟣' },
    'cpp': { name: 'C / C++', icon: '🔷' },
    'java': { name: 'Java', icon: '☕' },
    'rust': { name: 'Rust', icon: '🦀' },
    'go': { name: 'Go (Golang)', icon: '🐹' },
    'sql': { name: 'SQL Database', icon: '🗄️' },
    'html_css': { name: 'HTML5 & CSS3', icon: '🌐' },
    'bash': { name: 'Bash / Linux Shell', icon: '💻' }
  },

  snippets: {
    'javascript': [
      {
        id: 'js-1',
        title: 'Async Data Fetcher',
        code: "async function fetchUserData(userId) {\n  const res = await fetch(`/api/users/${userId}`);\n  if (!res.ok) throw new Error('Failed');\n  return await res.json();\n}",
        description: 'Async/await, template literals, and error throwing.'
      },
      {
        id: 'js-2',
        title: 'Array Pipeline Transform',
        code: "const activeUsers = users\n  .filter(u => u.isActive && u.score > 50)\n  .map(u => ({ id: u.id, name: u.name.trim() }))\n  .sort((a, b) => b.score - a.score);",
        description: 'Functional arrow pipeline with filter, map, and sort.'
      },
      {
        id: 'js-3',
        title: 'ES6 Modern Class',
        code: "class EventEmitter {\n  constructor() {\n    this.events = new Map();\n  }\n  on(event, listener) {\n    if (!this.events.has(event)) this.events.set(event, []);\n    this.events.get(event).push(listener);\n  }\n}",
        description: 'Object-oriented class with constructor and Map methods.'
      }
    ],

    'python': [
      {
        id: 'py-1',
        title: 'Dictionary Comprehension',
        code: "def build_lookup_table(items: list) -> dict:\n  return {\n    item['id']: item['value']\n    for item in items\n    if item.get('valid', False)\n  }",
        description: 'Python type hinting and dictionary comprehension.'
      },
      {
        id: 'py-2',
        title: 'File Context Manager',
        code: "with open('config.json', 'r', encoding='utf-8') as f:\n  data = json.load(f)\n  for key, value in data.items():\n    print(f'Setting {key}: {value}')",
        description: 'Safe with-statement context manager and f-strings.'
      },
      {
        id: 'py-3',
        title: 'Binary Search Algorithm',
        code: "def binary_search(arr, target):\n  low, high = 0, len(arr) - 1\n  while low <= high:\n    mid = (low + high) // 2\n    if arr[mid] == target: return mid\n    elif arr[mid] < target: low = mid + 1\n    else: high = mid - 1\n  return -1",
        description: 'Iterative binary search with integer division.'
      }
    ],

    'csharp': [
      {
        id: 'cs-1',
        title: 'LINQ Query Syntax',
        code: "var query = from photo in album.Photos\n  where photo.Width >= 1920 && !photo.IsDuplicate\n  orderby photo.CreatedAt descending\n  select new { photo.Id, photo.Path, photo.FileSize };",
        description: 'Declarative C# LINQ query with anonymous types.'
      },
      {
        id: 'cs-2',
        title: 'Generic Repository Pattern',
        code: "public class Repository<T> where T : class, IEntity {\n  private readonly DbContext _context;\n  public async Task<T> GetByIdAsync(int id) {\n    return await _context.Set<T>().FindAsync(id);\n  }\n}",
        description: 'Generic class constraints, async Task and interfaces.'
      },
      {
        id: 'cs-3',
        title: 'Record & Pattern Matching',
        code: "public record ScanResult(string Path, double Similarity, bool Match);\npublic string FormatResult(ScanResult res) => res switch {\n  { Match: true, Similarity: > 0.95 } => \"Identical duplicate\",\n  { Match: true } => \"Visually similar\",\n  _ => \"Unique photo\"\n};",
        description: 'C# 9+ record types and switch expression pattern matching.'
      }
    ],

    'cpp': [
      {
        id: 'cpp-1',
        title: 'Vector Sort with Lambda',
        code: "#include <algorithm>\n#include <vector>\nstd::vector<int> numbers = { 64, 34, 25, 12, 22 };\nstd::sort(numbers.begin(), numbers.end(), [](int a, int b) {\n  return a < b;\n});",
        description: 'C++ STL algorithm with inline lambda predicate.'
      },
      {
        id: 'cpp-2',
        title: 'Smart Pointers & Memory',
        code: "class Node {\npublic:\n  int value;\n  std::shared_ptr<Node> next;\n  Node(int val) : value(val), next(nullptr) {}\n};\nauto head = std::make_shared<Node>(42);",
        description: 'Modern RAII smart pointers and member initializer lists.'
      },
      {
        id: 'cpp-3',
        title: 'Template Function',
        code: "template <typename T>\nT clamp(T value, T minVal, T maxVal) {\n  if (value < minVal) return minVal;\n  if (value > maxVal) return maxVal;\n  return value;\n}",
        description: 'Generic template programming with comparison operators.'
      }
    ],

    'java': [
      {
        id: 'java-1',
        title: 'Stream API Aggregation',
        code: "List<String> names = employees.stream()\n  .filter(e -> e.getSalary() > 75000)\n  .map(Employee::getName)\n  .collect(Collectors.toList());",
        description: 'Java Streams pipeline with method references.'
      },
      {
        id: 'java-2',
        title: 'Try-With-Resources',
        code: "try (BufferedReader br = new BufferedReader(new FileReader(path))) {\n  String line;\n  while ((line = br.readLine()) != null) {\n    processLine(line.trim());\n  }\n} catch (IOException e) {\n  e.printStackTrace();\n}",
        description: 'Automatic resource management and exception handling.'
      },
      {
        id: 'java-3',
        title: 'Thread-Safe Singleton',
        code: "public class ConnectionPool {\n  private static volatile ConnectionPool instance;\n  private ConnectionPool() {}\n  public static ConnectionPool getInstance() {\n    if (instance == null) {\n      synchronized (ConnectionPool.class) {\n        if (instance == null) instance = new ConnectionPool();\n      }\n    }\n    return instance;\n  }\n}",
        description: 'Double-checked locking thread-safe singleton.'
      }
    ],

    'rust': [
      {
        id: 'rust-1',
        title: 'Result & Pattern Match',
        code: "fn parse_config(path: &str) -> Result<Config, Error> {\n  let content = fs::read_to_string(path)?;\n  match toml::from_str(&content) {\n    Ok(cfg) => Ok(cfg),\n    Err(e) => Err(Error::Parse(e)),\n  }\n}",
        description: 'Idiomatic Rust ? operator and match statement.'
      },
      {
        id: 'rust-2',
        title: 'Struct & Trait Implementation',
        code: "struct Point {\n  x: f64,\n  y: f64,\n}\nimpl Point {\n  fn distance(&self, other: &Point) -> f64 {\n    ((self.x - other.x).powi(2) + (self.y - other.y).powi(2)).sqrt()\n  }\n}",
        description: 'Struct definitions, methods, and borrowing references.'
      },
      {
        id: 'rust-3',
        title: 'Iterator Map & Filter',
        code: "let squares: Vec<i32> = (1..=10)\n  .filter(|&n| n % 2 == 0)\n  .map(|n| n * n)\n  .collect();\nprintln!(\"Even squares: {:?}\", squares);",
        description: 'Rust ranges, closure syntax |n|, and debug printing.'
      }
    ],

    'go': [
      {
        id: 'go-1',
        title: 'Goroutine with Channel',
        code: "ch := make(chan int, 10)\ngo func() {\n  for i := 0; i < 5; i++ {\n    ch <- i * 2\n  }\n  close(ch)\n}()\nfor val := range ch {\n  fmt.Println(\"Received:\", val)\n}",
        description: 'Concurrency with goroutines, channels, and range.'
      },
      {
        id: 'go-2',
        title: 'HTTP JSON Handler',
        code: "func HandleHealth(w http.ResponseWriter, r *http.Request) {\n  w.Header().Set(\"Content-Type\", \"application/json\")\n  resp := map[string]string{\"status\": \"ok\", \"code\": \"200\"}\n  if err := json.NewEncoder(w).Encode(resp); err != nil {\n    http.Error(w, err.Error(), 500)\n  }\n}",
        description: 'Go HTTP standard library handler with JSON encoding.'
      },
      {
        id: 'go-3',
        title: 'Struct with Custom Tags',
        code: "type User struct {\n  ID        int64     `json:\"id\" db:\"id\"`\n  Username  string    `json:\"username\" db:\"user_name\"`\n  CreatedAt time.Time `json:\"created_at\"`\n}\nfunc (u *User) FullName() string { return u.Username }",
        description: 'Go struct tags and pointer receiver methods.'
      }
    ],

    'sql': [
      {
        id: 'sql-1',
        title: 'Aggregate with Having Clause',
        code: "SELECT category_id, COUNT(*) AS total_items, AVG(price) AS avg_price\nFROM products\nWHERE is_active = 1\nGROUP BY category_id\nHAVING COUNT(*) >= 5\nORDER BY avg_price DESC;",
        description: 'Relational grouping, counting, having, and ordering.'
      },
      {
        id: 'sql-2',
        title: 'Multi-Table Inner Join',
        code: "SELECT u.id, u.username, o.order_date, p.product_name\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nINNER JOIN order_items oi ON o.id = oi.order_id\nINNER JOIN products p ON oi.product_id = p.id\nWHERE o.status = 'COMPLETED';",
        description: 'Multi-table INNER JOIN relationships with foreign keys.'
      },
      {
        id: 'sql-3',
        title: 'Window Function Ranking',
        code: "SELECT employee_id, department_id, salary,\n  DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank\nFROM employees\nORDER BY department_id, rank;",
        description: 'Advanced SQL window functions with PARTITION BY.'
      }
    ],

    'html_css': [
      {
        id: 'web-1',
        title: 'Modern Flexbox Card',
        code: "<div class=\"profile-card\">\n  <img src=\"avatar.png\" alt=\"Avatar\" class=\"avatar\">\n  <div class=\"details\">\n    <h3 class=\"title\">S1mplee67</h3>\n    <p class=\"bio\">Computer Engineering</p>\n  </div>\n</div>",
        description: 'Semantic HTML5 component markup.'
      },
      {
        id: 'web-2',
        title: 'CSS Custom Property Glass',
        code: ".glass-panel {\n  background: var(--bg-surface-glass);\n  backdrop-filter: blur(12px);\n  border: 1px solid var(--border-subtle);\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n}",
        description: 'Modern CSS backdrop filter and variable theming.'
      },
      {
        id: 'web-3',
        title: 'Responsive CSS Grid',
        code: ".bento-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n  align-items: stretch;\n}",
        description: 'Auto-fitting responsive CSS Grid layout.'
      }
    ],

    'bash': [
      {
        id: 'sh-1',
        title: 'Piped Analysis Chain',
        code: "cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -n 10",
        description: 'Classic Unix pipe chain: extract, count, sort, and top 10.'
      },
      {
        id: 'sh-2',
        title: 'Bash Script Guard & Loop',
        code: "#!/usr/bin/env bash\nset -euo pipefail\nfor file in *.jpg; do\n  if [[ -f \"$file\" ]]; then\n    echo \"Processing: $file\"\n    sha256sum \"$file\" >> checksums.txt\n  fi\ndone",
        description: 'Bash strict mode flags, file globbing, and checksumming.'
      },
      {
        id: 'sh-3',
        title: 'Git Status & Branch Checkout',
        code: "git checkout -b feature/offline-trainer\ngit add -A\ngit commit -m \"feat: implement 5 F!NGERS by S1mplee67\"\ngit push -u origin feature/offline-trainer",
        description: 'Essential Git command line workflow.'
      }
    ]
  },

  getSnippets(lang) {
    return this.snippets[lang] || [];
  },

  getRandomSnippet(lang) {
    const list = this.getSnippets(lang);
    if (!list.length) return null;
    const idx = Math.floor(Math.random() * list.length);
    return list[idx];
  }
};
