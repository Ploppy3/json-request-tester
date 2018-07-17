export abstract class Storage {

  public static KEY_TESTS = 'jrt-tests';

  public static get<type>(key: string, defaultValue: any) {
    let value = null;
    let json = localStorage.getItem(key);
    try {
      value = JSON.parse(json);
    } catch (error) { console.log(error) }
    return <type>value || <type>defaultValue;
  }

  public static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
