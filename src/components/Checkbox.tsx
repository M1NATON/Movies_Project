import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Card,
  Checkbox as CheckboxNext,
  CheckboxGroup,
  Input,
  ScrollShadow
} from "@nextui-org/react";

type Props = {
  title: string;
  type: string;
  list?: { name: string; slug: string }[];
  callbackValue: (data: { year?: number[]; genres?: string[]; type?: string[]; countries?: string[] }) => void;
  resetFilter: (resetFn: () => void) => void;
};

const Checkbox: React.FC<Props> = ({ list, title, callbackValue, type, resetFilter }) => {
  const [valueCheck, setValueCheck] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredList, setFilteredList] = useState(list);

  useEffect(() => {
    resetFilter(() => setValueCheck([]));
  }, [resetFilter]);

  useEffect(() => {

    const filtered = list?.filter(item =>
      typeof item.name === 'string' &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchTerm, list]);
  useEffect(() => {
    if (valueCheck.length === 0) {
      switch (type) {
        case "genres":
          callbackValue({ genres: [] });
          break;
        case "countries":
          callbackValue({ countries: [] });
          break;
        case "year":
          callbackValue({ year: [] });
          break;
        case "type":
          callbackValue({ type: [] });
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case "genres":
          callbackValue({ genres: valueCheck });
          break;
        case "countries":
          callbackValue({ countries: valueCheck });
          break;
        case "year":
          callbackValue({ year: valueCheck.map((v) => +v) });
          break;
        case "type":
          callbackValue({ type: valueCheck });
          break;
        default:
          break;
      }
    }
  }, [valueCheck, type, callbackValue]);



  return (
    <Card className={"mb-10 p-5"}>
      <Accordion>
        <AccordionItem className={"w-full"} title={title}>
          <ScrollShadow  orientation="horizontal" className={"max-h-[30vh] h-auto overflow-x-hidden"}>
            <CheckboxGroup
              className={"h-full"}
              value={valueCheck}
              onValueChange={setValueCheck}
            >

              <Input
                type="search"
                placeholder="Поиск"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {filteredList?.map((item, i) => (
                <CheckboxNext key={i} value={item.name}>
                  {item.name}
                </CheckboxNext>
              ))}
            </CheckboxGroup>
          </ScrollShadow>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default Checkbox;
