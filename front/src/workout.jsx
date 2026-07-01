import "./index.css";

export default function Workout() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="font-display text-4xl font-bold tracking-wide ml-8 mr-10">Workout Tracker</h1>
        <button
          class="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          data-fg-d3bl98="0.8:1.51754:/src/app/App.tsx:689:9:21014:297:e:button:et"
          data-fgid-d3bl98=":r3p:"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-plus"
            data-fg-d3bl99="0.8:1.51754:/src/app/App.tsx:693:11:21253:18:e:Plus::::::ISW"
            data-fgid-d3bl99=":r3q:"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          Log Workout
        </button>
      </div>
             
    <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold tracking-wide">
          TODAY'S SESSION
        </h2>
        <button className="text-muted-foreground hover:text-foreground">
          X
        </button>
      </div>

      {/* Exercise block */}
      <div className="bg-secondary rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Exercise name (e.g. Bench Press)"
            className="flex-1 bg-transparent border border-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary transition-colors"
          />
          <button className="text-muted-foreground hover:text-destructive transition-colors">
          x
          </button>
        </div>

        {/* Sets */}
        <div className="space-y-2 pl-1">
          <div className="flex items-center gap-3 text-sm font-mono">
            <span className="text-muted-foreground w-6 text-xs">S1</span>
            <input
              type="number"
              placeholder="5"
              defaultValue={5}
              className="w-16 bg-card border border-border rounded-lg px-2 py-1.5 text-center focus:outline-none focus:border-primary text-xs"
            />
            <span className="text-muted-foreground text-xs">reps ×</span>
            <input
              type="number"
              placeholder="135"
              className="w-20 bg-card border border-border rounded-lg px-2 py-1.5 text-center focus:outline-none focus:border-primary text-xs"
            />
            <span className="text-muted-foreground text-xs">lbs</span>
          </div>

          <button className="flex items-center gap-1 text-xs text-primary hover:opacity-75 transition-opacity mt-1">
            + Add Set
          </button>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground border border-border rounded-xl px-4 py-2 hover:border-primary/50 hover:text-foreground transition-colors">
          + Add Exercise
        </button>
        <button className="flex items-center gap-1.5 text-sm bg-primary text-primary-foreground rounded-xl px-5 py-2 font-semibold hover:opacity-90">
          Save Workout
        </button>
      </div>
    </div>
      </div>
    
  );
}
