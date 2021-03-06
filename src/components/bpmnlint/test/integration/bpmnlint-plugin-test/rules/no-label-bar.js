/**
 * Rule that reports bar labels.
 */
export default function() {

  function check(node, reporter) {
    if (/^bar/.test(node.name || '')) {
      reporter.report(node.id, 'Element has non-sense label <' + node.name + '>');
    }
  }

  return {
    check: check
  };
}