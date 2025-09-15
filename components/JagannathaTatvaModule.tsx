import React, { useState } from 'react';
import { JAGANNATHA_TATVA_CURRICULUM, JagannathaTopic, JAGANNATHA_PRACTICES, SCIENTIFIC_CORRELATIONS } from '../data/jagannathaTatva';

const JagannathaTatvaModule: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<JagannathaTopic | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [showPractices, setShowPractices] = useState(false);
  const [showScientificView, setShowScientificView] = useState(false);

  const filteredTopics = JAGANNATHA_TATVA_CURRICULUM.filter(topic => {
    const categoryMatch = selectedCategory === 'all' || topic.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || topic.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const getCategoryIcon = (category: string) => {
    const icons = {
      philosophy: '🕉️',
      history: '📜',
      science: '🔬',
      practice: '🧘‍♂️',
      symbolism: '🎭'
    };
    return icons[category as keyof typeof icons] || '📚';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              🏛️ जगन्नाथ तत्व
            </h1>
            <h2 className="text-2xl lg:text-3xl mb-4">Jagannatha Tatva</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Explore the profound Vedantic wisdom of Lord Jagannatha - from ancient scriptures to modern scientific correlations
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation and Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="philosophy">🕉️ Philosophy</option>
                <option value="history">📜 History</option>
                <option value="science">🔬 Science</option>
                <option value="practice">🧘‍♂️ Practice</option>
                <option value="symbolism">🎭 Symbolism</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={() => setShowPractices(!showPractices)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showPractices 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-orange-500 border border-orange-500'
                }`}
              >
                🧘‍♂️ Practices
              </button>
              <button
                onClick={() => setShowScientificView(!showScientificView)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showScientificView 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-blue-500 border border-blue-500'
                }`}
              >
                🔬 Scientific View
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topics List */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Topics ({filteredTopics.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedTopic?.id === topic.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 bg-white hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getCategoryIcon(topic.category)}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">{topic.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{topic.sanskrit}</p>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(topic.level)}`}>
                          {topic.level}
                        </span>
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          {topic.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            {selectedTopic ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{getCategoryIcon(selectedTopic.category)}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedTopic.title}</h2>
                      <p className="text-lg text-orange-600 font-medium">{selectedTopic.sanskrit}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <span className={`px-3 py-1 text-sm rounded-full ${getLevelColor(selectedTopic.level)}`}>
                      {selectedTopic.level}
                    </span>
                    <span className="px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full">
                      {selectedTopic.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Introduction */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">📖 Introduction</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedTopic.content.introduction}</p>
                  </div>

                  {/* Vedantic Source */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🕉️ Vedantic Sources</h3>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">{selectedTopic.content.vedanticSource}</p>
                    </div>
                  </div>

                  {/* Modern Correlation */}
                  {showScientificView && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">🔬 Modern Scientific Correlation</h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-700 leading-relaxed">{selectedTopic.content.modernCorrelation}</p>
                        {selectedTopic.content.scientificInsight && (
                          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">🧬 Scientific Insight</h4>
                            <p className="text-blue-700 text-sm">{selectedTopic.content.scientificInsight}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Practical Application */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🧘‍♂️ Practical Application</h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">{selectedTopic.content.practicalApplication}</p>
                    </div>
                  </div>

                  {/* Related Concepts */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🔗 Related Concepts</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTopic.relatedConcepts.map((concept, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-6xl mb-4">🏛️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Jagannatha Tatva</h3>
                <p className="text-gray-600">
                  Select a topic from the left to explore the profound Vedantic wisdom of Lord Jagannatha
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Practices Panel */}
        {showPractices && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🧘‍♂️ Jagannatha Tatva Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-green-700 mb-3">Daily Practices</h4>
                <ul className="space-y-2">
                  {JAGANNATHA_PRACTICES.daily.map((practice, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-700 mb-3">Weekly Practices</h4>
                <ul className="space-y-2">
                  {JAGANNATHA_PRACTICES.weekly.map((practice, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-700 mb-3">Special Practices</h4>
                <ul className="space-y-2">
                  {JAGANNATHA_PRACTICES.special.map((practice, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Scientific Correlations Panel */}
        {showScientificView && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🔬 Scientific Correlations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(SCIENTIFIC_CORRELATIONS).map(([key, value]) => (
                <div key={key} className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-sm text-blue-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JagannathaTatvaModule;
