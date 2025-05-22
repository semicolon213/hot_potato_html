import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaHome, FaBullhorn, FaBookOpen, FaSearch } from 'react-icons/fa';
import './App.css'; // 별도 CSS 파일 필요

// 타입 정의
type WidgetType = 
  | 'welcome' | 'notice' | 'lecture-note' | 'library' | 'grades' 
  | 'calendar' | 'attendance' | 'assignments' | 'timetable';

interface Widget {
  id: string;
  type: WidgetType;
  content: React.ReactNode;
}

const App: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 초기 위젯 설정
  useEffect(() => {
    const savedWidgets = localStorage.getItem('erp-dashboard');
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    } else {
      setWidgets([{
        id: 'welcome-1',
        type: 'welcome',
        content: (
          <div className="widget-content">
            <p>대학 ERP 시스템에 오신 것을 환영합니다.</p>
            <p>+ 버튼으로 위젯을 추가하세요.</p>
          </div>
        )
      }]);
    }
  }, []);

  // 저장 기능
  useEffect(() => {
    localStorage.setItem('erp-dashboard', JSON.stringify(widgets));
  }, [widgets]);

  // 위젯 추가 함수
  const addWidget = (type: WidgetType) => {
    const newWidget: Widget = {
      id: `${type}-${Date.now()}`,
      type,
      content: renderWidgetContent(type)
    };
    setWidgets([...widgets, newWidget]);
    setIsModalOpen(false);
  };

  // 위젯 내용 생성
  const renderWidgetContent = (type: WidgetType): React.ReactNode => {
    switch(type) {
      case 'notice':
        return (
          <div className="widget-content">
            <p>[학사] 수강신청 일정 변경 안내</p>
            <p>[장학] 국가장학금 신청 안내</p>
          </div>
        );
      case 'grades':
        return (
          <div className="widget-content">
            <p>데이터베이스: A+</p>
            <p>알고리즘: A0</p>
          </div>
        );
      // 다른 위젯 케이스...
      default:
        return <div className="widget-content"><p>새 위젯</p></div>;
    }
  };

  // 위젯 삭제
  const removeWidget = (id: string) => {
    if (id.startsWith('welcome-')) {
      alert('기본 위젯은 삭제할 수 없습니다.');
      return;
    }
    setWidgets(widgets.filter(w => w.id !== id));
  };

  return (
    <div className="erp-container">
      {/* 사이드바 */}
      <div className="sidebar">
        <div className="menu-item">
          <div className="menu-icon">📊</div>
          <span>대시보드</span>
        </div>
        {/* 다른 메뉴 항목들... */}
      </div>

      {/* 메인 영역 */}
      <div className="main-content">
        <div className="header">
          <h1>대학 ERP 시스템</h1>
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="검색..." />
          </div>
        </div>

        {/* 위젯 그리드 */}
        <div className="widget-grid">
          {widgets.map(widget => (
            <div key={widget.id} className={`widget ${widget.type}`}>
              <div className="widget-header">
                <h3>
                  {widget.type === 'welcome' && <FaHome />}
                  {widget.type === 'notice' && <FaBullhorn />}
                  {widget.type.replace('-', ' ')}
                </h3>
                <button onClick={() => removeWidget(widget.id)}>
                  <FaTrash />
                </button>
              </div>
              {widget.content}
            </div>
          ))}
        </div>

        {/* 위젯 추가 버튼 */}
        <button 
          className="add-widget-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> 위젯 추가
        </button>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>위젯 추가</h2>
            <div className="widget-options">
              {['notice', 'grades', 'calendar', 'attendance'].map(type => (
                <div 
                  key={type}
                  className="widget-option"
                  onClick={() => addWidget(type as WidgetType)}
                >
                  {type === 'notice' && <FaBullhorn />}
                  {type === 'grades' && <FaBookOpen />}
                  <h3>{type.replace('-', ' ')}</h3>
                </div>
              ))}
            </div>
            <button onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;