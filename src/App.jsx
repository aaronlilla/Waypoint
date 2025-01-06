import './App.scss'
import Titlebar from './components/Titlebar/titlebar';
import Navigation from './components/Navigation/navigation';
import Viewport from './components/Viewport/viewport';
function App() {
  return (
    <>
      <Titlebar />
      <div className="content">
        <Navigation />
        <Viewport />
      </div>
    </>
  )
}

export default App
