import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { Search } from "lucide-react";
import Select from "./components/ui/Select";
import { useState } from "react";
import Popup from "./components/ui/Popup";

const App = () => {
  const [value, setValue] = useState("");

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];
  return (
    <Theme>
      <Popup
        triggerLabel="Open Form"
        title="Subscribe to Newsletter"
        description="Stay updated with our latest news."
        variant="white"
      >
        <form className="grid gap-3">
          <Input label="Email" placeholder="you@example.com" />
          <Button type="submit" variant="black" size="ra">
            Subscribe
          </Button>
        </form>
      </Popup>
      <Select
        label="Fruit"
        placeholder="Choose a fruit"
        options={options}
        value={value}
        onValueChange={setValue}
        variant="white"
      />
      <Input
        label="Search"
        placeholder="Search..."
        icon={<Search />}
        variant="white"
        size="md"
      />

      <Button variant="black" size="ra">
        Black
      </Button>
    </Theme>
  );
};

export default App;
