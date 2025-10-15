/**
 * Rain Tokens - Weighted token system for code rain effect
 * Provides curated code fragments with weighted distribution
 */

export const TOKENS = {
  SYMBOLS: ["{","}","(",")","[","]","<",">","</>","::","=>","==","===","!=","!==","?",":",";",",",".","…","|","||","&","&&","~","^","%","+","-","*","/","\\","->","<-","=>"],
  REGEX: ["/","\\","\\d","\\w","\\s","\\b","\\B","^","$",".*",".*?","+?","?:","(?=)","(?! )","(?<)","(?<=)","(?<! )","[A-Z]","[a-z]","\\n","\\t"],
  LITERALS: ["0","1","42","3.14","0xFF","NaN","null","undefined","true","false"],
  CORE: ["if","else","for","while","do","in","of","new","try","catch","finally","break","continue","switch","case","return","yield","await","async"],
  JS: ["let","const","var","class","extends","import","from","export","default","this","super","typeof","instanceof"],
  PY: ["def","class","self","None","lambda","with","as","yield","async","await","elif","pass"],
  C: ["int","char","void","auto","enum","struct","using","namespace","public","private","protected","static","virtual","override"],
  HTMLCSS: ["<div>","</div>","<span>","</span>","<a>","</a>","<ul>","</ul>","<li>","</li>","<p>","</p>","{ }",":root","--var","calc()","rem","px"],
  BITS: ["0","1","001","010","101","110","0110","1010","0011"]
};

export const WEIGHTS = {
  SYMBOLS: 3.0,
  CORE: 2.0,
  JS: 2.0,
  PY: 1.8,
  REGEX: 1.5,
  LITERALS: 1.5,
  BITS: 1.5,
  C: 1.0,
  HTMLCSS: 1.0
};

/**
 * Build weighted token pool
 * @param {Object} tokens - Token buckets
 * @param {Object} weights - Weight values
 * @param {Object} options - Filter options
 * @returns {Array} Weighted token pool
 */
export function buildWeightedPool(tokens, weights, options = {}) {
  const { minLen = 1, maxLen = 6 } = options;
  const pool = [];

  Object.keys(tokens).forEach(category => {
    const weight = weights[category] || 1.0;
    const categoryTokens = tokens[category];
    
    categoryTokens.forEach(token => {
      // Filter by length
      if (token.length >= minLen && token.length <= maxLen) {
        // Add token multiple times based on weight
        const repetitions = Math.ceil(weight);
        for (let i = 0; i < repetitions; i++) {
          pool.push(token);
        }
      }
    });
  });

  return pool;
}

/**
 * Pick random token from pool
 * @param {Array} pool - Token pool
 * @returns {String} Random token
 */
export function pickToken(pool) {
  if (!pool || pool.length === 0) {
    return "0"; // Fallback
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Token system class
 */
export class TokenSystem {
  constructor(options = {}) {
    this.options = {
      minLen: 1,
      maxLen: 6,
      ...options
    };
    this.pool = null;
    this.initialize();
  }

  initialize() {
    this.pool = buildWeightedPool(TOKENS, WEIGHTS, this.options);
    console.log(`Token pool initialized with ${this.pool.length} tokens`);
  }

  getToken() {
    return pickToken(this.pool);
  }

  getSample(count = 20) {
    const sample = [];
    for (let i = 0; i < count; i++) {
      sample.push(this.getToken());
    }
    return sample;
  }

  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.initialize();
  }

  getStats() {
    const stats = {};
    Object.keys(TOKENS).forEach(category => {
      const categoryTokens = TOKENS[category].filter(token => 
        token.length >= this.options.minLen && token.length <= this.options.maxLen
      );
      stats[category] = {
        count: categoryTokens.length,
        weight: WEIGHTS[category] || 1.0,
        tokens: categoryTokens
      };
    });
    return stats;
  }
}

// Default instance
export const defaultTokenSystem = new TokenSystem();
