import { useState, useEffect } from 'react';
import { Home, Target, Users, TrendingUp, User, Search, Bell, Menu, Star, Award, Calendar, Clock, MapPin, Leaf, Heart, Shield, ShoppingBag, BookOpen, Play, CheckCircle, Coins, Trophy, Zap } from 'lucide-react';

const EcoYodhaApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [notificationCount] = useState(3);
  const [dailyTipIndex, setDailyTipIndex] = useState(0);
  const [userPoints, setUserPoints] = useState(1250);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showEcoStore, setShowEcoStore] = useState(false);
  const [showLearning, setShowLearning] = useState(false);
  const [challengesCompleted, setChallengesCompleted] = useState(24);
  const [badgesEarned, setBadgesEarned] = useState(18);

  const dailyTips = [
    "Did you know? Turning off lights when not in use can save up to 15% of your energy bill.",
    "Planting trees helps combat climate change by absorbing CO2 from the atmosphere.",
    "Using a reusable water bottle can save an average of 156 plastic bottles annually.",
    "A single tree can provide a day's supply of oxygen for up to four people."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDailyTipIndex((prev) => (prev + 1) % dailyTips.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [dailyTips.length]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage dailyTip={dailyTips[dailyTipIndex]} userPoints={userPoints} setUserPoints={setUserPoints} setChallengesCompleted={setChallengesCompleted} />;
      case 'challenges':
        return <ChallengesPage showLearning={showLearning} setShowLearning={setShowLearning} completedLessons={completedLessons} setCompletedLessons={setCompletedLessons} userPoints={userPoints} setUserPoints={setUserPoints} setChallengesCompleted={setChallengesCompleted} setBadgesEarned={setBadgesEarned} />;
      case 'community':
        return <CommunityPage />;
      case 'progress':
        return <ProgressPage userPoints={userPoints} />;
      case 'profile':
        return <ProfilePage userPoints={userPoints} showEcoStore={showEcoStore} setShowEcoStore={setShowEcoStore} purchasedItems={purchasedItems} setPurchasedItems={setPurchasedItems} setUserPoints={setUserPoints} challengesCompleted={challengesCompleted} badgesEarned={badgesEarned} />;
      default:
        return <HomePage dailyTip={dailyTips[dailyTipIndex]} userPoints={userPoints} setUserPoints={setUserPoints} setChallengesCompleted={setChallengesCompleted} />;
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="text-xl font-bold text-green-800">EcoYodha</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-green-100">
              <Search className="h-5 w-5 text-green-700" />
            </button>
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-green-100">
                <Bell className="h-5 w-5 text-green-700" />
              </button>
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </div>
            <button className="p-2 rounded-full hover:bg-green-100">
              <Menu className="h-5 w-5 text-green-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="container mx-auto flex justify-around py-3">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'challenges', icon: Target, label: 'Challenges' },
            { id: 'community', icon: Users, label: 'Community' },
            { id: 'progress', icon: TrendingUp, label: 'Progress' },
            { id: 'profile', icon: User, label: 'Profile' }
          ].map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center px-4 py-2 rounded-lg ${activeTab === item.id ? 'text-green-600 bg-green-100' : 'text-gray-500'}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

const HomePage = ({ dailyTip, userPoints, setUserPoints, setChallengesCompleted }: { dailyTip: string; userPoints: number; setUserPoints: (points: number) => void; setChallengesCompleted: (count: (prev: number) => number) => void }) => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Daily Eco Tip</h2>
            <p className="text-lg">{dailyTip}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <Coins className="h-5 w-5" />
              <span className="font-bold text-lg">{userPoints.toLocaleString()}</span>
            </div>
            <div className="text-sm opacity-90">Points</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center">
          <Target className="h-10 w-10 text-green-600 mb-2" />
          <h3 className="font-semibold">Daily Challenge</h3>
          <p className="text-sm text-gray-600 mt-1">Earn 20 points today</p>
          <button 
            className="mt-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600"
            onClick={() => {
              setUserPoints(userPoints + 20);
              setChallengesCompleted(prev => prev + 1);
            }}
          >
            Start Now (+20 pts)
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center">
          <Users className="h-10 w-10 text-blue-600 mb-2" />
          <h3 className="font-semibold">Team Up</h3>
          <p className="text-sm text-gray-600 mt-1">Join a competition</p>
          <button 
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600"
            onClick={() => {
              setUserPoints(userPoints + 50);
              setChallengesCompleted(prev => prev + 1);
            }}
          >
            Find Team (+50 pts)
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center col-span-2">
          <TrendingUp className="h-10 w-10 text-orange-600 mb-2" />
          <h3 className="font-semibold">Leaderboard</h3>
          <p className="text-sm text-gray-600 mt-1">See your ranking</p>
          <button 
            className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600"
            onClick={() => {
              setUserPoints(userPoints + 10);
              setChallengesCompleted(prev => prev + 1);
            }}
          >
            View Rankings (+10 pts)
          </button>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Weekly Progress</h3>
        <div className="flex justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              />
              <circle
                className="text-green-500 stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset="175.84"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">65%</span>
              <span className="text-sm text-gray-600">210/320 pts</span>
            </div>
          </div>
        </div>
        <p className="text-center mt-4 text-gray-600">Keep going! You're doing great.</p>
      </div>

      {/* News Feed */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Recent Activities</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ece8c32d-83fa-49e4-85e4-7309df37f4f9.png"
              alt="Young eco-activist with a bright smile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">Priya completed 'Plastic Free Day' challenge</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1339cc19-b761-4d82-b995-f79318c99992.png"
              alt="Student wearing a school uniform"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">Rahul's school planted 50 trees this week</p>
              <p className="text-sm text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/15d8e2ca-0966-4a29-8cbc-9eef6c5140d4.png"
              alt="Teacher with glasses and friendly expression"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">Mr. Sharma's class leads in water conservation</p>
              <p className="text-sm text-gray-500">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChallengesPage = ({ showLearning, setShowLearning, completedLessons, setCompletedLessons, userPoints, setUserPoints, setChallengesCompleted, setBadgesEarned }: { 
  showLearning: boolean; 
  setShowLearning: (show: boolean) => void; 
  completedLessons: string[]; 
  setCompletedLessons: (lessons: string[]) => void; 
  userPoints: number;
  setUserPoints: (points: number) => void;
  setChallengesCompleted: (count: (prev: number) => number) => void;
  setBadgesEarned: (count: (prev: number) => number) => void;
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'individual', label: 'Individual' },
    { id: 'team', label: 'Team' },
    { id: 'school', label: 'School' },
    { id: 'time', label: 'Time-limited' },
    { id: 'learning', label: 'Learning' }
  ];

  const learningLessons = [
    {
      id: 'climate-basics',
      title: 'Climate Change Basics',
      description: 'Learn the fundamentals of climate change and its impact on our planet.',
      duration: '15 min',
      points: 50,
      difficulty: 'Beginner',
      completed: completedLessons.includes('climate-basics')
    },
    {
      id: 'renewable-energy',
      title: 'Renewable Energy Sources',
      description: 'Explore solar, wind, and other clean energy solutions.',
      duration: '20 min',
      points: 75,
      difficulty: 'Intermediate',
      completed: completedLessons.includes('renewable-energy')
    },
    {
      id: 'waste-reduction',
      title: 'Zero Waste Living',
      description: 'Master the art of reducing waste in your daily life.',
      duration: '25 min',
      points: 100,
      difficulty: 'Advanced',
      completed: completedLessons.includes('waste-reduction')
    },
    {
      id: 'biodiversity',
      title: 'Biodiversity Conservation',
      description: 'Understand the importance of protecting Earth\'s diverse ecosystems.',
      duration: '18 min',
      points: 60,
      difficulty: 'Beginner',
      completed: completedLessons.includes('biodiversity')
    }
  ];

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      // Find the lesson and award points
      const lesson = learningLessons.find(l => l.id === lessonId);
      if (lesson) {
        setUserPoints(userPoints + lesson.points);
        setChallengesCompleted(prev => prev + 1);
        // Award a badge for every 3 lessons completed
        if ((completedLessons.length + 1) % 3 === 0) {
          setBadgesEarned(prev => prev + 1);
        }
      }
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-green-800">Challenges</h2>
      
      {/* Filter Tabs */}
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`whitespace-nowrap px-4 py-2 rounded-full ${activeFilter === filter.id ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Learning Section */}
      {activeFilter === 'learning' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="h-8 w-8" />
              <div>
                <h3 className="text-xl font-bold">Eco Learning Center</h3>
                <p className="text-blue-100">Expand your environmental knowledge</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-2xl font-bold">{completedLessons.length}</div>
                <div className="text-sm">Lessons Completed</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-2xl font-bold">{learningLessons.length}</div>
                <div className="text-sm">Total Lessons</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {learningLessons.map((lesson) => (
              <div key={lesson.id} className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{lesson.title}</h3>
                      {lesson.completed && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{lesson.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{lesson.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-1" />
                        <span>{lesson.points} pts</span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-1" />
                        <span>{lesson.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  {lesson.completed ? (
                    <button className="w-full bg-green-100 text-green-800 py-2 rounded-lg font-medium flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Completed
                    </button>
                  ) : (
                    <button 
                      className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium flex items-center justify-center"
                      onClick={() => handleLessonComplete(lesson.id)}
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start Learning
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenge Cards */}
      {activeFilter !== 'learning' && (
        <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">Plastic Free Day</h3>
              <div className="flex items-center mt-1 space-x-2">
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-500">Medium</span>
              </div>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">30 pts</span>
          </div>
          <p className="text-gray-600 mt-2">Avoid single-use plastic for 24 hours and document your experience.</p>
          <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>1 day</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>Individual</span>
            </div>
          </div>
          <div className="mt-4 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-right text-xs text-gray-500 mt-1">45% completed</p>
          <button 
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600"
            onClick={() => {
              setUserPoints(userPoints + 30);
              setChallengesCompleted(prev => prev + 1);
            }}
          >
            Complete Challenge (+30 pts)
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">Tree Planting Drive</h3>
              <div className="flex items-center mt-1 space-x-2">
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-500">Easy</span>
              </div>
            </div>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">Team • 100 pts</span>
          </div>
          <p className="text-gray-600 mt-2">Organize a tree planting event with your school or community.</p>
          <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>7 days</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>Team</span>
            </div>
          </div>
          <button 
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600"
            onClick={() => {
              setUserPoints(userPoints + 100);
              setChallengesCompleted(prev => prev + 1);
            }}
          >
            Complete Team Challenge (+100 pts)
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">Water Conservation Week</h3>
              <div className="flex items-center mt-1 space-x-2">
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-sm text-gray-500">Hard</span>
              </div>
            </div>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">School • 500 pts</span>
          </div>
          <p className="text-gray-600 mt-2">Implement water-saving measures throughout your school for one week.</p>
          <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>3 days left</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Location-based</span>
            </div>
          </div>
          <button 
            className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600"
            onClick={() => {
              setUserPoints(userPoints + 500);
              setChallengesCompleted(prev => prev + 1);
            }}
          >
            Complete School Challenge (+500 pts)
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

const CommunityPage = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-green-800">Community</h2>
      
      {/* School Leaderboard */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">School Leaderboard</h3>
        <div className="space-y-3">
          {[
            { name: "Green Valley School", points: 5240, position: 1 },
            { name: "Eco Warriors Academy", points: 4875, position: 2 },
            { name: "Sustainable Future HS", points: 4320, position: 3 },
            { name: "Nature's Path Institute", points: 3895, position: 4 },
            { name: "Earth Guardians School", points: 3450, position: 5 }
          ].map((school, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${index < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                  {school.position}
                </div>
                <span className="font-medium">{school.name}</span>
              </div>
              <span className="font-semibold text-green-700">{school.points.toLocaleString()} pts</span>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full text-green-600 font-medium py-2">
          View Full Leaderboard
        </button>
      </div>

      {/* Discussion Forums */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Popular Discussions</h3>
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h4 className="font-medium">Best ways to reduce plastic waste in schools?</h4>
            <p className="text-sm text-gray-500 mt-1">Posted by EcoTeacher • 128 comments</p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <h4 className="font-medium">Share your rainwater harvesting projects</h4>
            <p className="text-sm text-gray-500 mt-1">Posted by WaterSaver • 76 comments</p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <h4 className="font-medium">Organizing a successful community cleanup event</h4>
            <p className="text-sm text-gray-500 mt-1">Posted by CleanUpCaptain • 94 comments</p>
          </div>
        </div>
        <button className="mt-4 w-full text-green-600 font-medium py-2">
          View All Discussions
        </button>
      </div>

      {/* Success Stories */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Success Stories</h3>
        <div className="space-y-4">
          <div className="flex">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4a1050e7-5cc4-4ebf-ae29-876b12a45a64.png"
              alt="Students celebrating after a successful tree planting event"
              className="w-20 h-20 rounded-lg object-cover mr-4"
            />
            <div>
              <h4 className="font-medium">How our school reduced waste by 75%</h4>
              <p className="text-sm text-gray-500 mt-1">By GreenStudentsTeam • 2 days ago</p>
            </div>
          </div>
          <div className="flex">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fff6fa4d-0bad-4080-8ed8-c926876f9509.png"
              alt="Community members participating in a beach cleanup activity"
              className="w-20 h-20 rounded-lg object-cover mr-4"
            />
            <div>
              <h4 className="font-medium">Beach cleanup: 200kg trash collected!</h4>
              <p className="text-sm text-gray-500 mt-1">By CoastalGuardians • 1 week ago</p>
            </div>
          </div>
        </div>
        <button className="mt-4 w-full text-green-600 font-medium py-2">
          View More Stories
        </button>
      </div>
    </div>
  );
};

const ProgressPage = ({ userPoints }: { userPoints: number }) => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-green-800">My Progress</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-3xl font-bold text-green-600">{userPoints.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-3xl font-bold text-blue-600">24</div>
          <div className="text-sm text-gray-600">Challenges Completed</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-3xl font-bold text-purple-600">18</div>
          <div className="text-sm text-gray-600">Badges Earned</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-3xl font-bold text-orange-600">5</div>
          <div className="text-sm text-gray-600">Active Streaks</div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Environmental Impact</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Carbon Reduced</span>
              <span className="text-sm font-medium">120 kg</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Plastic Saved</span>
              <span className="text-sm font-medium">480 items</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Water Conserved</span>
              <span className="text-sm font-medium">1,200 liters</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Badges Earned</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
            <span className="text-sm font-medium">Eco Novice</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <span className="text-sm font-medium">Green Thumb</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <span className="text-sm font-medium">Planet Protector</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <span className="text-sm font-medium">Water Warrior</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <span className="text-sm font-medium">Community Leader</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 border-2 border-dashed border-gray-300">
              <span className="text-gray-400">?</span>
            </div>
            <span className="text-sm text-gray-400">Locked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ 
  userPoints, 
  showEcoStore, 
  setShowEcoStore, 
  purchasedItems, 
  setPurchasedItems, 
  setUserPoints,
  challengesCompleted,
  badgesEarned
}: { 
  userPoints: number; 
  showEcoStore: boolean; 
  setShowEcoStore: (show: boolean) => void; 
  purchasedItems: string[]; 
  setPurchasedItems: (items: string[]) => void; 
  setUserPoints: (points: number) => void; 
  challengesCompleted: number;
  badgesEarned: number;
}) => {

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="bg-white p-5 rounded-xl shadow-md">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4f6cb111-6280-456e-9e1a-e85689aec60a.png"
            alt="Young eco-activist smiling"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-xl font-bold">Riya Sharma</h2>
          <p className="text-gray-600">Green Valley School, Grade 10</p>
          <div className="mt-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            Level 5 Eco Yodha
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{userPoints.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{challengesCompleted}</div>
            <div className="text-xs text-gray-600">Challenges</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{badgesEarned}</div>
            <div className="text-xs text-gray-600">Badges</div>
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">My Interests</h3>
        <div className="flex flex-wrap gap-2">
          {['Recycling', 'Tree Planting', 'Water Conservation', 'Clean Energy', 'Wildlife Protection'].map((interest, index) => (
            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Eco Store Section */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Eco Store</h3>
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600"
            onClick={() => setShowEcoStore(!showEcoStore)}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>{showEcoStore ? 'Hide Store' : 'View Store'}</span>
          </button>
        </div>
        
        {showEcoStore && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg">Your Points</h4>
                  <p className="text-green-100">Redeem points for eco-friendly items</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{userPoints.toLocaleString()}</div>
                  <div className="text-sm text-green-100">Available Points</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  id: 'reusable-bottle',
                  name: 'Eco Water Bottle',
                  description: 'Stainless steel reusable water bottle',
                  price: 200,
                  image: '💧',
                  category: 'Essentials'
                },
                {
                  id: 'seed-packets',
                  name: 'Wildflower Seed Packets',
                  description: 'Plant native flowers to support pollinators',
                  price: 150,
                  image: '🌻',
                  category: 'Gardening'
                },
                {
                  id: 'eco-bag',
                  name: 'Canvas Shopping Bag',
                  description: 'Durable reusable shopping bag',
                  price: 100,
                  image: '🛍️',
                  category: 'Essentials'
                },
                {
                  id: 'compost-bin',
                  name: 'Mini Compost Bin',
                  description: 'Start composting at home',
                  price: 300,
                  image: '♻️',
                  category: 'Gardening'
                },
                {
                  id: 'solar-charger',
                  name: 'Solar Phone Charger',
                  description: 'Charge your devices with clean energy',
                  price: 500,
                  image: '☀️',
                  category: 'Tech'
                },
                {
                  id: 'tree-certificate',
                  name: 'Tree Planting Certificate',
                  description: 'Certificate for planting a tree in your name',
                  price: 250,
                  image: '🌳',
                  category: 'Impact'
                }
              ].map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">{item.image}</div>
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <div className="font-semibold text-green-600">{item.price} pts</div>
                      <div className="text-gray-500">{item.category}</div>
                    </div>
                    <button
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        purchasedItems.includes(item.id)
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : userPoints >= item.price
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      onClick={() => {
                        if (userPoints >= item.price && !purchasedItems.includes(item.id)) {
                          setPurchasedItems([...purchasedItems, item.id]);
                          setUserPoints(userPoints - item.price);
                        }
                      }}
                      disabled={purchasedItems.includes(item.id) || userPoints < item.price}
                    >
                      {purchasedItems.includes(item.id) ? 'Owned' : userPoints >= item.price ? 'Buy' : 'Need More Points'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {purchasedItems.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Your Purchases</h4>
                <div className="flex flex-wrap gap-2">
                  {purchasedItems.map((itemId) => {
                    const ecoStoreItems = [
                      { id: 'reusable-bottle', name: 'Eco Water Bottle', image: '💧' },
                      { id: 'seed-packets', name: 'Wildflower Seeds', image: '🌻' },
                      { id: 'eco-bag', name: 'Canvas Bag', image: '🛍️' },
                      { id: 'compost-bin', name: 'Compost Bin', image: '♻️' },
                      { id: 'solar-charger', name: 'Solar Charger', image: '☀️' },
                      { id: 'tree-certificate', name: 'Tree Certificate', image: '🌳' }
                    ];
                    const item = ecoStoreItems.find(i => i.id === itemId);
                    return item ? (
                      <div key={itemId} className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg">
                        <span className="text-lg">{item.image}</span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Settings</h3>
        <div className="space-y-3">
          <button className="w-full text-left py-2 flex justify-between items-center">
            <span>Notification Settings</span>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full text-left py-2 flex justify-between items-center">
            <span>Privacy & Data</span>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full text-left py-2 flex justify-between items-center">
            <span>Language</span>
            <span className="text-gray-400">English →</span>
          </button>
          <button className="w-full text-left py-2 flex justify-between items-center">
            <span>Help & Support</span>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full text-left py-2 flex justify-between items-center text-red-500">
            <span>Log Out</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};


export default EcoYodhaApp;