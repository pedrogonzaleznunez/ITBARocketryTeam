'use client';

/**
 * Hook para generar enlaces de Google Calendar
 * 
 * @example
 * // Uso básico
 * const calendarLink = useGoogleCalendar({
 *   title: 'Mi Evento',
 *   startDate: new Date('2026-02-01T10:00:00'),
 *   endDate: new Date('2026-02-01T12:00:00'),
 * });
 * 
 * @example
 * // Con descripción y ubicación
 * const calendarLink = useGoogleCalendar({
 *   title: 'Lanzamiento de Cohete',
 *   startDate: new Date('2026-02-01T10:00:00'),
 *   endDate: new Date('2026-02-01T12:00:00'),
 *   description: 'Lanzamiento del cohete ITBA Rocketry Team',
 *   location: 'Spaceport America, Nuevo México',
 * });
 */

interface UseGoogleCalendarOptions {
  /** Título del evento */
  title: string;
  /** Fecha y hora de inicio del evento */
  startDate: Date;
  /** Fecha y hora de fin del evento */
  endDate: Date;
  /** Descripción opcional del evento */
  description?: string;
  /** Ubicación opcional del evento */
  location?: string;
}

/**
 * Genera un enlace de Google Calendar para agregar un evento
 * 
 * @param options - Opciones del evento
 * @returns URL de Google Calendar para agregar el evento
 */
export function useGoogleCalendar(options: UseGoogleCalendarOptions): string {
  const { title, startDate, endDate, description = '', location = '' } = options;

  /**
   * Formatear fechas en formato ISO 8601 sin guiones ni dos puntos: YYYYMMDDTHHmmssZ
   */
  const formatDate = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  };

  const start = formatDate(startDate);
  const end = formatDate(endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details: description,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

