import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import TodoApp from "./components/TodoApp";

const App = () => {
  return (
    <Theme>
      <TodoApp />
    </Theme>
  );
};

export default App;
