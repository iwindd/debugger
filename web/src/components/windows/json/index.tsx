import React from "react";
import "./style.css";
import "react-json-view-lite/dist/index.css";
import JsonView from "@uiw/react-json-view";
import { vscodeTheme } from "@uiw/react-json-view/vscode";
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import Draggable from "react-draggable";

interface Json {
  invokingResource: string;
  id: string;
  data: any;
  lastUpdated: number;
}

interface JsonCategory {
  name: string;
  count: number;
}

const JsonViewer = () => {
  const [jsonData, setJsonData] = React.useState<Json[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedData, setSelectedData] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState<string>("");
  const [sort, setSort] = React.useState<boolean>(true);
  const categories: JsonCategory[] = jsonData.reduce(
    (acc: JsonCategory[], { invokingResource }) => {
      const cat = acc.find((c) => c.name === invokingResource);
      cat ? cat.count++ : acc.push({ name: invokingResource, count: 1 });
      return acc;
    },
    []
  );

  useNuiEvent<Json | Json[]>("json", (data) => {
    if (Array.isArray(data)) {
      data.forEach((item) => (item.lastUpdated = Date.now()));
      setJsonData((prevData) => {
        const existingData = prevData.find((d) => d.id === data[0].id);
        if (existingData) {
          return prevData.map((d) =>
            d.id === data[0].id ? { ...d, data: data[0].data } : d
          );
        }

        return [...prevData, ...data];
      });
    } else {
      data.lastUpdated = Date.now();
      setJsonData((prevData) => {
        const existingData = prevData.find((d) => d.id === data.id);
        if (existingData) {
          return prevData.map((d) =>
            d.id === data.id ? { ...d, data: data.data } : d
          );
        }
        return [...prevData, data];
      });
    }
  });

  useNuiEvent<{
    invokingResource?: string;
    id?: string;
  }>("json:clear", ({ invokingResource, id }) => {
    setJsonData((prevData) => {
      if (invokingResource) {
        return prevData.filter(
          (data) => data.invokingResource !== invokingResource
        );
      } else if (id) {
        return prevData.filter((data) => data.id !== id);
      }
      return prevData;
    });
  });

  return (
    <Draggable handle="header.json-header" bounds="parent">
      <div className="json-viewer">
        <header className="json-header">
          <h2>JSON Viewer</h2>
        </header>
        <main>
          <div className="json-categories">
            {(categories.length > 0 && (
              <ul>
                {categories.map((category) => (
                  <li
                    className={
                      selectedCategory == category.name ? "selected" : ""
                    }
                    onClick={() => setSelectedCategory(category.name)}
                    key={category.name}
                  >
                    <label>{category.name}</label>
                    <span>{category.count}</span>
                  </li>
                ))}
              </ul>
            )) || <p>No items.</p>}
          </div>
          <div className="json-data">
            <header>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div>
                <input
                  type="checkbox"
                  name="sort"
                  id="sort"
                  checked={sort}
                  onChange={(e) => setSort(e.target.checked)}
                />
                <label htmlFor="sort">Sort by last updated.</label>
              </div>
            </header>
            <article>
              {(selectedCategory && (
                <ul>
                  {jsonData
                    .filter(
                      (data) => data.invokingResource === selectedCategory
                    )
                    .filter((data) =>
                      data.id
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    )
                    .sort((a, b) =>
                      sort
                        ? b.lastUpdated - a.lastUpdated
                        : a.lastUpdated - b.lastUpdated
                    )
                    .map((data) => (
                      <li
                        key={data.id}
                        onClick={() => setSelectedData(data.id)}
                        className={selectedData == data.id ? "selected" : ""}
                      >
                        <header>
                          {data.id}:
                          <span>
                            {new Date(data.lastUpdated).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </header>
                        <pre>
                          <JsonView
                            objectSortKeys={true}
                            collapsed={1}
                            value={data.data}
                            style={vscodeTheme}
                          />
                        </pre>
                      </li>
                    ))}
                </ul>
              )) || <p>Select a category to view its data.</p>}
            </article>
          </div>
        </main>
      </div>
    </Draggable>
  );
};

export default JsonViewer;
