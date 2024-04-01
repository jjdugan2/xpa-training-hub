const formatDuration = (duration: string): string => {
    // Parse the duration string (e.g., "PT5M8S")
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "00:00";
  
    // Extract hours, minutes, and seconds
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
  
    // Format the duration based on the time units
    if (hours > 0) {
      // Format for durations longer than 60 minutes
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    } else if (minutes > 0) {
      // Format for durations longer than 60 seconds but less than 60 minutes
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    } else {
      // Format for durations shorter than 1 minute
      return `0:${String(seconds).padStart(2, "0")}`;
    }
  };
  
  export default formatDuration;
  