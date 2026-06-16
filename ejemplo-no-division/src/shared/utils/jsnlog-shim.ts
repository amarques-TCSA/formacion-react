type JLLogger = {
  [key: string]: unknown;
};

type JLFn = ((loggerName?: string) => JLLogger) & {
  enabled?: boolean;
  setOptions?: (options: Record<string, unknown>) => void;
};

const noopLogger: JLLogger = {};

const JL: JLFn = Object.assign(
  (_loggerName?: string) => noopLogger,
  {
    enabled: false,
    setOptions: (_options: Record<string, unknown>) => undefined,
  },
);

export { JL };
export default JL;
